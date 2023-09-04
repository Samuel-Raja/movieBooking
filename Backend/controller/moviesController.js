
const MovieData = require('../model/MovieData');

const mongoose = require('mongoose');



 const getAllMovies = async(req, res) => {

      
        return res.status(200).json(await MovieData.find({}));


    }


  const createNewMovie = async (req, res) => {


    try{  

     if(!req.body.Name || !req.body.Src) {

        return res.status(404).json("Name and Src is required");

     }   
        

    await  MovieData.create({

        "Name" : req.body.Name,
        "Src": req.body.Src

    });

   
   return res.status(201).json(await MovieData.find({}));


 } catch (err) {

   return res.status(404).json(err)

 }
         

  }



  const updateMovie = async( req, res ) => {

   try {


      const id =  req.body._id ;

      if(!id) {

        return res.status(404).json("Movie Id is required");

      }

      if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json("No such Id found")

      }
    
      
     const findMovie =  await MovieData.findByIdAndUpdate(id, {...req.body} )  ;

    if(!findMovie) {

    return res.status(404).json("No such Id found")

    };

    res.status(201).json({"Success": "The movie data is updated"});


    } catch(err) {


      res.status(404).json(`error: ${err}`);


    }



  }



  const deleteMovie = async(req, res) => {

   
      try{

        const id =  req.body._id ;

      if(!id) {

        return res.status(404).json("Movie Id is required");

      }

      if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json("No such Id found")

      }
    
      
     const findAndDelete = await MovieData.findByIdAndDelete(id)  ;

    if(!findAndDelete) {

    return res.status(404).json("No such Id found")

    };

    res.status(201).json({"Success": "The movie is Deleted"});

        

      } catch(err) {

      
         res.status(404).json(`error: ${err}`);


      }


  }







module.exports = {getAllMovies, createNewMovie, updateMovie, deleteMovie}