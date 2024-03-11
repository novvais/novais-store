import { Router } from "express";
import { registerAdm, loginAdm, updateAdm, detailAdmProfile, deleteAdm } from "../App/Controllers/admin";
import { registerClient, loginClient, updateClient, detailClientProfile, deleteClient } from "../App/Controllers/client"
import { registerProduct, updateProduct, listProduct, detailProduct, deleteProduct } from "../App/Controllers/products"
import { file } from "../App/Controllers/upload";
import { listCategories } from "../App/Controllers/categories"
// import {  } from "../App/Controllers/cart"
// import {  } from "../App/Controllers/wishlist"

const router: Router = Router()

router.get("/api/admin", registerAdm);

router.get("/api/upload", file)

export { router };
