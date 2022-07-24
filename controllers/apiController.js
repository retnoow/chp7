const {user_game, pvp_room} = require('../models')

const format = (user) =>{
    const {id, username} = user
    return{
        id,
        username,
        token: user.generateToken()
    }
}

const isP1Win = (p1Hand, p2Hand) =>{
    //if p1 win return 1
    if(p1Hand == 'r' && p2Hand == 's' || (p1Hand == 's' && p2Hand == 'p' || (p1Hand == 'p' && p2Hand == 'r' )))
        return res.json({message: 'player 1 win'})

    //else return -1

    // else draw return 0

}

module.exports = {
    login: (req, res) =>{
        user_game.authenticate(req.body)
            .then(user => {
                res.json(format(user))
            })
    },
    whoami: (req, res) =>{
        const currentUser = req.user
        res.json(currentUser)
    },
    createRoom: (req, res) =>{
        const {id} = req.user.dataValues
        
        pvp_room.create({
            p1_id: id
        }).then(room => res.json({
            roomId: room.id
        }))

        //return

    },

    join: (req, res) =>{
        const {roomid} = req.params
        const {id} = req.user.dataValues
        
        pvp_room.findOne({where:{
            id: roomid
        }}).then(room =>{

            if(room.p2_id != null)
            return res.status(402).json({
                message: 'player 2 already joined'
            })
        })

        pvp_room.update({
            p2_id: id
        }, {where: {id: roomid}})
        .then(() =>{
            res.json({message: 'successfully joined'})
        })
    },

    fight: async(req, res) => {
        const {roomid} = req.params
        const {id} = req.user.dataValues
        const {firstHand, secondHand, thirdHand} = req.body
        let isP1 = false
        let isP2 = false

        if(!firstHand || !secondHand || !thirdHand){
            return res.json({message: 'please pick firstHand, secondHand and thirdHand first!'})
        }
        
        const room = await pvp_room.findOne({where:{
            id: roomid
        }})

        if(room == null) {
            return res.status(404).json({
                message: 'room is not found!'
            })
        }

        if(room.winner_id != null)
            return res.status(422).json({
                message: 'game has ended!'
            })

            if(room.p1_id == id)
            isP1 = true

            if(room.p2_id == id)
            isP2 = true

            if(!isP1 && !isP2)
            return res.status(401).json({
                message: 'you are an unauthorized player!'
            })

            if(isP1){
                pvp_room.update({
                    p1_firstHand: firstHand,
                    p1_secondHand: secondHand,
                    p1_thirdHand: thirdHand,
                    
                }, {where: {id: roomid}

                }).then(()=>{
                    res.json({message: 'successfully adding hands!'})
                })
            }

            if(isP2){
                pvp_room.update({
                    p2_firstHand: firstHand,
                    p2_secondHand: secondHand,
                    p2_thirdHand: thirdHand,
                    
                }, {where: {id: roomid}

                }).then(()=>{
                    res.json({message: 'successfully adding hands!'})
                })
            }
        
    },
    winner: (req, res) =>{
        let balancer = 0

        balancer = balancer + isP1Win(room.p1_firstHand, room.p2_firstHand)
        balancer = balancer + isP1Win(room.p1_secondHand, room.p2_secondHand)
        balancer = balancer + isP1Win(room.p1_thirdHand, room.p2_thirdHand)

    }
}