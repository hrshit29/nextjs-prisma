import express from "express"
import {client} from "@repo/db/client";
const app =express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hi there");
})
app.post("/signup",async (req,res)=>{
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username or password. Ensure Content-Type is application/json." });
        return;
    }
    const username= req.body.username;
    const password=req.body.password;
    try {
        const user = await client.user.create({
            data:{
                username:username,
                password:password
            }
        })
        res.json({
            message:"signed succesfully",
            id:user.id
        })
    } catch (e: any) {
        if (e.code === 'P2002') {
            res.status(400).json({ error: "Username already exists" });
        } else {
            console.error(e);
            res.status(500).json({ error: "Internal server error", details: e.message || String(e) });
        }
    }
})
app.listen(3002);