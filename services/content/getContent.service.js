const { Op } = require("sequelize");
const CategoryModel = require("../../models/category.model");
const ContentModel = require("../../models/content.model");
const UsersModel = require("../../models/users.model");
const LikeModel = require("../../models/like.model");
const CommentModel = require("../../models/comment.model");
const OrganizationModel = require("../../models/organization.model");
const SpeakersModel = require("../../models/speakers.model");
const LanguageModel = require("../../models/language.model");

async function GetContentService(
  id,
  status,
  categoryID,
  organizationID,
  speakerID,
  languageID,
  highlight,
  title
) {
  try {
    let whereClause = {};

    if (id) {
      whereClause.id = id;
    }

    if (status) {
      whereClause.status = status;
    }

    if (categoryID) {
      whereClause.categoryID = categoryID;
    }

    if (organizationID) {
      whereClause.organizationID = organizationID;
    }

    if (speakerID) {
      whereClause.speakerID = speakerID;
    }

    if (languageID) {
      whereClause.languageID = languageID;
    }

    if (title) {
      whereClause.title = {
        [Op.like]: `%${title}%`, // Using Op.like to perform a case-insensitive search
      };
    }

    if (highlight === "trending") {
      return await GetTrendingContent();
    }

    const contentData = await ContentModel.findAll({
      where: whereClause,
      include: [
        { model: CategoryModel }, // This fetches category for the content
        { model: LikeModel },
        { model: OrganizationModel },
        { model: SpeakersModel },
        { model: LanguageModel },
        {
          model: CommentModel,
          include: [{ model: UsersModel }],
        },
      ],
    });

    // Extract unique categories from the content data
    // const uniqueCategories = [];
    // const categoryMap = {};

    // contentData.forEach(content => {
    //     if (content.category && !categoryMap[content.category.title]) {
    //         uniqueCategories.push({
    //             id: content.category.id,
    //             title: content.category.title
    //         });
    //         categoryMap[content.category.title] = true; // Mark as processed
    //     }
    // });
    const categories = contentData.map((item) => item.category.title);
    const language = contentData.map((item) => item.language.title);

    // Create a set to remove duplicates
    const uniqueCategories = [...new Set(categories)];
    const uniqueLanguages = [...new Set(language)];

    return {
      status: true,
      count: contentData.length,
      data: contentData,
      categories: uniqueCategories, // Return unique categories here
      languages : uniqueLanguages
    };
  } catch (error) {
    console.error("Error retrieving Content:", error);
    return {
      status: false,
      message: "Failed to retrieve Content. Please try again later.",
    };
  }
}

async function GetTrendingContent() {
  try {
    const contentData = await ContentModel.findAll({
      where: {},
      include: [{ model: UsersModel }, { model: CategoryModel }],
      order: [["count", "DESC"]],
      limit: 5,
    });

    return {
      status: true,
      count: contentData.length,
      data: contentData,
    };
  } catch (error) {
    console.error("Error retrieving Trending Content:", error);
    return {
      status: false,
      message: "Failed to retrieve Trending Content. Please try again later.",
    };
  }
}

module.exports = GetContentService;
