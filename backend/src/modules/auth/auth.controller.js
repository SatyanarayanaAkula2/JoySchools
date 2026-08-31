import { loginAdmin, revokeRefreshToken, handleRefreshToken, getAdminSecurityQuestion, resetPasswordWithSecurityQuestion } from "./auth.service.js";

const isProduction = process.env.NODE_ENV === "production";

export async function login(req, res) {
  try {
    const { username, password } = req.validatedBody;
    const { accessToken, refreshToken, admin } = await loginAdmin(username, password);

    // Set Access Token cookie (15 minutes)
    res.cookie("admin_access_token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000, // 15 mins in ms
      path: "/",
    });

    // Set Refresh Token cookie (7 days)
    res.cookie("admin_refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      path: "/",
    });

    return res.status(200).json({ success: true, admin, accessToken });
  } catch (error) {
    console.error("Login controller error:", error);
    return res.status(401).json({ success: false, error: error.message || "Invalid credentials" });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.admin_refresh_token;
    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    res.clearCookie("admin_access_token", { path: "/" });
    res.clearCookie("admin_refresh_token", { path: "/" });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Logout controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to logout" });
  }
}

export async function refresh(req, res) {
  try {
    const refreshToken = req.cookies.admin_refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ success: false, error: "No refresh token provided." });
    }

    const result = await handleRefreshToken(refreshToken);
    if (!result) {
      return res.status(401).json({ success: false, error: "Invalid or expired refresh token." });
    }

    // Set new Access Token cookie (15 minutes)
    res.cookie("admin_access_token", result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({ success: true, accessToken: result.accessToken, admin: result.admin });
  } catch (error) {
    console.error("Refresh controller error:", error);
    return res.status(500).json({ success: false, error: "Token refresh failed." });
  }
}

export async function me(req, res) {
  try {
    return res.status(200).json({ success: true, admin: req.admin });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}

export async function refreshAndRedirect(req, res) {
  try {
    const redirectPath = req.query.redirect || "/admin";
    const refreshToken = req.cookies.admin_refresh_token;

    if (!refreshToken) {
      res.clearCookie("admin_access_token", { path: "/" });
      res.clearCookie("admin_refresh_token", { path: "/" });
      return res.redirect("/admin/login");
    }

    const result = await handleRefreshToken(refreshToken);
    if (!result) {
      res.clearCookie("admin_access_token", { path: "/" });
      res.clearCookie("admin_refresh_token", { path: "/" });
      return res.redirect("/admin/login");
    }

    // Set new Access Token cookie (15 minutes)
    res.cookie("admin_access_token", result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return res.redirect(redirectPath);
  } catch (error) {
    console.error("Refresh and redirect controller error:", error);
    return res.redirect("/admin/login");
  }
}

export async function retrieveSecurityQuestion(req, res) {
  try {
    const { username } = req.validatedBody;
    const question = await getAdminSecurityQuestion(username);
    return res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("retrieveSecurityQuestion controller error:", error);
    return res.status(400).json({ success: false, error: error.message || "Failed to retrieve security question." });
  }
}

export async function resetPassword(req, res) {
  try {
    const { username, answer, newPassword } = req.validatedBody;
    await resetPasswordWithSecurityQuestion(username, answer, newPassword);
    return res.status(200).json({ success: true, message: "Password has been reset successfully." });
  } catch (error) {
    console.error("resetPassword controller error:", error);
    return res.status(400).json({ success: false, error: error.message || "Failed to reset password." });
  }
}

