import { Router } from "express";
const router = Router();


let adoptions = [];

router.get("/", (req, res) => {
    res.json({ status: "success", payload: adoptions });
});

router.get("/:aid", (req, res) => {
    const { aid } = req.params;
    const adoption = adoptions.find(a => a._id === aid);
    if (!adoption) return res.status(404).json({ status: "error", error: "Adopción no encontrada" });
    res.json({ status: "success", payload: adoption });
});

export default router;