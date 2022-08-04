const db = require('../db/db.js');

class FolderController {
    async getCurrent(req,res) {
        let {id} = req.body;
        if (id === undefined || !id) {
            res.status(400).json({message:`Field 'id' does not exist`})
        } else {
            const folder = await db.query(`SELECT * FROM folder where id=$1`, [id] )
            if (!folder.rows.length) {
                res.status(200).json({
                    message:`Folder with id:${id} not found`
                })
            } else {
                res.status(200).json(folder.rows[0]);
            }
        }
    }

    async create(req, res) {
        try {
            let {folder,newFolder} = req.body;
            if (folder === undefined || newFolder === undefined) {
                res.status(400).json({message:`Fields 'folder' and 'newFolder' does not exist`})
            } else {
                const folders = await db.query(`SELECT * FROM folder WHERE name=$1`,[newFolder]);
                if (folders.length) {
                    return res.status(200).json({
                        message:`This folder already exist ('${folders[0].name}')`
                    });
                }
                const newfolder = await db.query(`INSERT  INTO folder (name,path) values ($1, $2) RETURNING *`,[newFolder,`${folder}/${newFolder}`]);
                console.log('Dir '+ newfolder.rows[0].name + ' create');
                return res.status(200).json(newfolder.rows[0]);
            }
            
        } catch (e) {
            res.status(500).json({message:e.message})
        }
    }

    async getAll (req,res) {
        const folders = await db.query('SELECT * FROM folder');
        res.status(200).json(folders.rows)
    }

    async deleteFolder (req,res) {
        try {
            let { id } = req.body;
            if (id === undefined || !id) {
                res.status(400).json({message:`Field 'id' does not exist`})
            } else {
                const folder = await db.query('DELETE FROM folder WHERE id=$1 RETURNING *',[id])
                if (folder.rows.length === 0) {
                    res.status(200).json({
                        message:`Folder with id:${id} not found`
                    })
                } else {
                    console.log('Dir named ' + folder.rows[0].name + ' was deleted');
                    res.status(200).json({
                        message:'Folder named ' + folder.rows[0].name + ' was deleted',
                        folderId:folder.rows[0].id,
                    })
                }
            }
        } catch (e) {
            res.status(500).json({message:e.message})
        }   
    }
}

module.exports = new FolderController();