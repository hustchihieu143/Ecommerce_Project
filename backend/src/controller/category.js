const Category = require("../models/category");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => {
            return cat.parentId == undefined;
        });
    } else {
        category = categories.filter((cat) => {
            return cat.parentId == parentId;
        });
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id),
        });
    }
    return categoryList;
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    };

    if (req.file) {
        categoryObj.categoryImage =
            process.env.API + "public/" + req.file.filename;
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(404).json({ message: error.message });
        }
        if (category) {
            return res.status(200).json({ category: category });
        }
    });
};

exports.getCategory = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) {
            return res.status(404).json({ message: error.message });
        }

        if (categories) {
            // let names = categories.map((item) => {
            //     return item.name;
            // });
            let categoryList = createCategories(categories);
            return res.status(200).json({ categoryList });
        }
    });
};
