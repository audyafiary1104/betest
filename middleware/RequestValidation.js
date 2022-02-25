const yup = require("yup");

exports.Login = async (req, res, next) => {
    const schema = yup.object({
        body: yup.object({
          username: yup.string().required(),
          password: yup.string().required(),
        }),
      });
      try {
        await schema.validate({
          body: req.body,
        });
        return next();
      } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    } 
};
exports.CreateUsers = async (req, res, next) => {
    const schema = yup.object({
        body: yup.object({
          userName: yup.string().required(),
          accountNumber: yup.string().required(),
          emailAddress: yup.string().required(),
          identityNumber: yup.string().required(),
          password: yup.string().required(),
        }),
      });
      try {
        await schema.validate({
          body: req.body,
        });
        return next();
      } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    } 
};
exports.UpdateUsers = async (req, res, next) => {
    const schema = yup.object({
        body: yup.object({
          username: yup.string().required(),
          accountNumber: yup.string().required(),
          emailAddress: yup.string().required(),
          identityNumber: yup.string().required(),
        }),
        params: yup.object({
            userid: yup.string().required(),
          }),
      });
      try {
        await schema.validate({
          body: req.body,
          params: req.params
        });
        return next();
      } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    } 
};
exports.Delete = async (req, res, next) => {
    const schema = yup.object({
        params: yup.object({
            userid: yup.string().required(),
          }),
      });
      try {
        await schema.validate({
          params: req.params
        });
        return next();
      } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    } 
};
exports.UserSingle = async (req, res, next) => {
    const schema = yup.object({
        body: yup.object({
            filterBy: yup.string().required().oneOf(['accountNumber','identityNumber']),
            filter: yup.string().required(),
          }),
      });
      try {
        await schema.validate({
            body: req.body
        });
        return next();
      } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    } 
};