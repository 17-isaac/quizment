import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    // secure set to true causes it to not run in localhost on safari
    cookie: {
        //firebase token
      name: "firebase",
      // all of these are optional
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
      maxAge: 1000,
      path: "/",
      sameSite: "lax",
      secrets: ["tacos"],
      secure: true
    }
  });

export { getSession, commitSession, destroySession };