import express from "express";
import passport from "passport";
import { Response, Request } from "express";
import { register, login, forgetpassword } from "../controllers/Auth.Controller";

const router = express.Router();

// Register & Login
router.post("/register", register);
router.post("/login", login);

// ✅ Google Authentication Routes
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/api/v1/auth/login",
        successRedirect: "/api/v1/auth/dashboard",
    })
);

// ✅ Protected Route (Requires Login)
// router.get("/dashboard", (req:Request, res:Response) => {
//     if (!req.isAuthenticated()) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     res.json({ message: "Welcome to Dashboard", user: req.user });
// });

// ✅ Logout Route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.redirect("/");
    });
});

// Forget Password
router.post("/forget-password", forgetpassword);
router.post('/reset-password')

export default router;
