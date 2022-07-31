const Folder = require('../models/models');

class FolderController {
    async getCurrent(req,res) {
        let {id} = req.body;
        if (id === undefined || !id) {
            res.status(400).json({message:`Field 'id' does not exist`})
        } else {
            const folder = await Folder.find({_id:id});
            if (!folder.length) {
                res.status(200).json({
                    message:`Folder with id:${id} not found`
                })
            } else {
                res.status(200).json({folder});
            }
        }
    }

    async create(req, res) {
        try {
            let {folder,newFolder} = req.body;
            if (folder === undefined || newFolder === undefined) {
                res.status(400).json({message:`Fields 'folder' and 'newFolder' does not exist`})
            } else {
                const folders = await Folder.find({name:newFolder});
                if (folders.length) {
                    return res.json({
                        message:`This folder already exist ('${folders[0].name}')`
                    });
                }
                const newfolder = new Folder({name:newFolder,path:`${folder}/${newFolder}`});
                await newfolder.save();
                console.log('Dir '+ newfolder.name + ' create');
                return res.status(200).json({
                    folderName: newfolder.name,
                    path: newfolder.path
                });
            }
            
        } catch (e) {
            res.status(500).json({message:e.message})
        }
    }

    async getAll (req,res) {
        const folders = await Folder.find();
        res.status(200).json(folders)
    }

    async deleteFolder (req,res) {
        try {
            let { id } = req.body;
            if (id === undefined || !id) {
                res.status(400).json({message:`Field 'id' does not exist`})
            } else {
                const folder = await Folder.findByIdAndDelete(id);
                if (folder === null) {
                    res.status(200).json({
                        message:`Folder with id:${id} not found`
                    })
                } else {
                    console.log('Dir named ' + folder.name + ' was deleted');
                    res.status(200).json({
                        message:'Folder named ' + folder.name + ' was deleted',
                        folderId:folder._id,
                    })
                }
            }
        } catch (e) {
            res.status(500).json({message:e.message})
        }   
    }
}

module.exports = new FolderController();