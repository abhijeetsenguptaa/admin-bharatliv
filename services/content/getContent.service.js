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
        { model: CategoryModel }, // Fetch category for the content
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

    // Extract unique categories and languages with ids and titles
    const categories = contentData.map((item) => ({
      id: item.category.id,
      title: item.category.title,
    }));

    const languages = contentData.map((item) => ({
      id: item.language.id,
      title: item.language.title,
    }));

    // Create a set to remove duplicates by using ids and titles
    const uniqueCategories = [...new Map(categories.map((item) => [item.id, item])).values()];
    const uniqueLanguages = [...new Map(languages.map((item) => [item.id, item])).values()];

    return {
      status: true,
      count: contentData.length,
      data: contentData,
      categories: uniqueCategories, // Return unique categories with id and title
      languages: uniqueLanguages,   // Return unique languages with id and title
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
