const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = new Item({ name, description });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;
  try {
    const item = await Item.findById(id);
    item.comments.push({ user, text });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
