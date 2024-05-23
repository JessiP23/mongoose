import express from 'express';
import Users from '../modules/Users.js';

const router = new express.Router();

//create a new endpoint
router.get('/', async(req, res) => {
    try {
        const user = await Users.find();
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /users/
 * Create a new user
 */
router.post('/', async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.send(user);
        //res.json(user).status(203);
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /user/:ID
 * Get user by id
 */

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        
        if (!user) {
            res.send('User not found');
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send({ error: "Error, invalid data" });
    }
});


/**
 * DELETE /users/:id
 * Deletes an user
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await Users.findByIdAndDelete(req.params.id);
        res.send({
            deletedUser: result,
            message: "User deleted!"
        });
    } catch (error) {
        console.log(error);
        res.send({ error: "Error, invalid data" });
    }
});

/**
 * PUT /users/:id
 * Updates an user
 */
router.put('/:id', async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(updatedUser);
    } catch (error) {
        console.log(error);
        res.send({ error: "Error, invalid data" });
    }
})

export default router;