import { AppError } from "../../../shared/errors/AppError";

export function validateUser(req, res, next) {
    const { email, name, password } = req.body;
    if (!email || !name || !name) {
      throw new AppError("Preencha todos os campos obrigatórios", 400)
    }

    if (password.length < 6) {
        throw new AppError("A senha deve ter no mínimo 6 caracteres", 400)
    }
    if(password.length > 12) {
        throw new AppError("A senha deve ter no máximo 12 caracteres", 400)
    }

    if(name.length < 2) {
        throw new AppError("O nome deve ter no mínimo 2 caracteres", 400)
    }

    if(name.length > 50) {
        throw new AppError("O nome deve ter no máximo 50 caracteres", 400)
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new AppError("Email inválido", 400)
    }
    next();
  }