const { NoteModel } = require("../schema/note.schema");
const { convertToSlug } = require("../helper/index.helper");
const randomstring = require("randomstring");
const noteGet = async (req, res) => {
  const {content_id} = req.headers;
  const {slug} = req.params;
  try{

    const findItem = await NoteModel.findOne({slug :  slug}).select("-__v");
    if(findItem && findItem.content_id === content_id)  {
      return res.status(200).json({ message: "success", data: findItem , is_edit : true });
    }
    findItem.is_edit = false;
    const { content_id: _, ...itemWithoutContentId } = findItem.toObject();
    return res.status(200).json({ message: "success", data: itemWithoutContentId });
  }
  catch (err) {
    return res.status(500).json({ message: `someting went wrong`, error: err });
  }
};

const notePost = async (req, res) => {
  const { title, description, aurthor, content_id } = req.body;
  // Object.entries(req.body).map(([key, item]) => {
  //   if (!item)
  //     res.status(400).json({ message: `failed , ${key} is required*` });
  // });

  try {
   
    const newData = new NoteModel({
      title,
      description,
      aurthor,
      content_id : randomstring.generate(),
      user_id : req["rootId"] || "",
      slug: convertToSlug(title),
    });
    const saveData = await newData.save();
    return res.status(200).json({ message: "success", data: saveData });
  } catch (err) {
    return res.status(500).json({ message: `someting went wrong`, error: err });
  }
};

const notePut = async (req, res) => {
  const { content_id } = req.body;

  // Object.entries(req.body).map(([key, item]) => {
  //   if (!item)
  //     return res.status(400).json({ message: `failed , ${key} is required*` });
  // });

  try {
    const findCId = await NoteModel.exists({ content_id: content_id });
    if (!findCId)
      return res
        .status(401)
        .json({ message: `failed , you don't have permission to update` });
      

      const updatedData = {
        ...req.body,
        slug: convertToSlug(req.body.title), 
        user_id : req["rootId"] || ""
      };


    const findData = await NoteModel.findOne(
      { content_id });
      if (!findData) return res.status(404).json({ message: `failed , no record found.` });
      findData.title = updatedData.title;
      findData.slug = updatedData.slug;
      findData.aurthor = updatedData.aurthor;
      findData.description = updatedData.description;
      findData.user_id = updatedData.user_id;
      findData.save()

    
    res.status(200).json({ message: "success", data: findData });
  } catch (err) {
    return res.status(500).json({ message: `someting went wrong`, error: err });
  }
};

module.exports = { noteGet, notePost, notePut };
