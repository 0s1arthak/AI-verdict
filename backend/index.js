import express from 'express'
import cors from 'cors'
import {OpenAI} from 'openai'
import dotenv from 'dotenv'


dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());



const port=5000;

app.get('/',(req,res)=>{
    res.send("You are on home page");
})



app.post('/trial',async(req,res)=>{
    const {name,uni,loc,title}=req.body;
    console.log(`Name is ${name}, universe is ${uni}, list of charges is ${loc} and title of trial is ${title}`);
    const defendant=`Act as a defendant for ${name} in ${uni} and put strong points for ${name} in their defense that it would become difficult to counter them (keep the paragraph short/medium not too long)`
    const plaintiff=`Act as a plaintiff for ${name} in ${uni} and put strong points against ${name} (keep the paragraph short/medium not too long)`
    let defendantResponse='';
    let plaintiffResponse='';
    let judgeResponse='';

    console.log("Api key",process.env.OPEN_AI_API_KEY);





    // trycatch for defendant


    try {
        const promise=await fetch('https://openrouter.ai/api/v1/chat/completions',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${process.env.OPEN_AI_API_KEY}`,
                'Content-type':'application/json',

            },
            body:JSON.stringify({
                model:"openrouter/cypher-alpha:free",
                messages:[
                    {role:'system',content:'You are the strongest defendant.'},
                    {role:'user',content:defendant}
                ]
            })
        })

        const data=await promise.json();
        console.log(data);
        defendantResponse=data.choices?.[0]?.message?.content || 'Sorry, no response from AI.';
        // console.log(defendantResponse);
        // res.json({defendantResponse:defendantResponse});

        

    } catch (error) {
        console.log("LLM error1",error);
        res.status(500).json({error:"Something went wrong in talking to LLM"});
        
    }



    // trycatch for plaintiff
    try {

        const promise=await fetch('https://openrouter.ai/api/v1/chat/completions',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${process.env.OPEN_AI_API_KEY}`,
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                model:'openrouter/cypher-alpha:free',
                messages:[
                    {role:'system',content:'You are the strongest plaintiff.'},
                    {role:'user',content:plaintiff}
                ]
            })
        })
        const data=await promise.json();
        plaintiffResponse=data.choices?.[0]?.message?.content || 'Sorry, no response from AI.';
        // console.log(plaintiffResponse);
        // res.json({plaintiffResponse:plaintiffResponse})


        
    } catch (error) {
        console.log("LLM error2",error);
        res.status(500).json({error:"Something went wrong in talking to LLM"});
    }


    const judge=`After hearing both ${defendantResponse} and ${plaintiffResponse} judge ${name} accordingly and produce verdict guilty or not guilty`;



    // trycatch for judge
    try {
        const promise=await fetch('https://openrouter.ai/api/v1/chat/completions',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${process.env.OPEN_AI_API_KEY}`,
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                model:"openrouter/cypher-alpha:free",
                messages:[
                    {role:'system',content:'You are an unbiased judge.'},
                    {role:'user',content:judge}
                ]
            })
        })

        const data=await promise.json();
        judgeResponse=data.choices?.[0]?.message?.content || 'Sorry, no response from AI.';
        // console.log(judgeResponse);
        res.json({judgeResponse:judgeResponse});




    } catch (error) {
        console.log("LLM error3",error);
        res.status(500).json({error:"Error in connecting to LLM"})
        
    }

})




app.listen(port,()=>console.log(`Server is listening on port ${port}`));