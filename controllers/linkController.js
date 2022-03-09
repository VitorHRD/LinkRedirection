const Link = require('../models/Link');
const express = require('express');
const app = express()
const redirect = async (req , res)=>{
    let title = req.params.title;
    try{
    let doc = await Link.findOneAndUpdate({title},{$inc : {click : 1}});
    if(doc){
        res.redirect(doc.url);
    }
    }catch(error){
       res.send(error);
    }
    }
    const addLink = async (req,res)=>{
        let link = new Link(req.body)
        try{
            let doc = await link.save();
            res.redirect('/');
        }catch(error){
            res.render('add', {error, body:req.body});
        }
    }
    const allLinks = async (req ,res) =>{
        let value = ""
        try{
            let links = await Link.find({});
            links.sort((a,b)=>{
                if(a > b){
                    return -1;
                }
                else{
                    return true
                }
            })
            if(links != ""){
            res.render('all',{links});
        }
        else{
            res.render('error',{value})
        }
        }
        catch(error){
            res.send(error);
        }
    }
    const deleteLink = async (req,res)=>{
        let id = req.params.id;
           try{
           await Link.findByIdAndDelete(id);
           res.send(id);

           }catch(error){
             res.status(404).send(error);
           }
    }
    const loadLink= async (req,res)=>{
        let id = req.params.id;
           try{
           let doc = await Link.findById(id);
           res.render('edit',{body:doc , error:false});
           }catch(error){
             res.status(404).send(error);
           }
    }
    const editLink = async (req,res)=>{
        let id = req.params.id;
        let link = {};
        link.title = req.body.title;
        link.description = req.body.description;
        link.url = req.body.url;
        try{
            let doc = await Link.updateOne({_id: id }, link);
            res.redirect('/');
        }catch(error){
            console.log(error.message);
            res.render('edit', {error, body:req.body});
        }
    }
      const searchLink = async(req , res) =>{
          let value = req.params.value;
          let values = "^"+ value;

          try{

              let links = await Link.find({"title": new RegExp( values ,"i"),})
              if (links != ""){
                res.render('all.ejs',{links})
            }
            else{
                res.render('error',{value})
            }
          }
          catch(error){
             console.log(error.message);
             res.send(error.message);
          }
      }
      const clickRedirect = async(req,res) =>{
          let value = ""
        try{
            let links = await Link.find({});

            
            links.sort((a,b)=>{
                if(a.click > b.click){
                    return -1;
                }
                else{
                    return true
                }
            })
        
            if(links != ""){
            res.render('click',{links});
        }
        else{
            res.render('error',{value})
        }
      }catch(error){
          console.log(error)
      }
      }


    module.exports = {redirect , addLink , allLinks,deleteLink , loadLink , editLink, searchLink,clickRedirect}