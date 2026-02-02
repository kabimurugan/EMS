import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employee_id,
      password,
      department,
      role,
      salary,
      dob,
      gender,
      marital_status,
      designation,
    } = req.body;

    if (!name || !email || !password || !employee_id) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await Employee.findOne({
      $or: [{ email }, { employee_id }],
    });

    if (existing) {
      return res.status(409).json({
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      name,
      email,
      employee_id,
      password: hashedPassword,
      department,
      role,
      salary,
      dob,
      gender,
      marital_status,
      designation,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const fetchEmployee = await Employee.find().populate("department", "dep_name")
    return res.status(200).json({ success: true, fetchEmployee })
  }
  catch (error) {
    return res.status(500).json({ success: false, error: "Data not fetched from DB" })
  }
}


export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const getEmployee = await Employee.findById({ _id: id })
    return res.status(200).json({ success: true, getEmployee })
  }
  catch (error) {
    return res.status(500).json({ success: false, error: "getEmployee Server Error" })
  }
}

export const updateEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      employee_id: req.body.employee_id,
      dob: req.body.dob,
      gender: req.body.gender,
      marital_status: req.body.marital_status,
      designation: req.body.designation,
      role: req.body.role,
      salary: Number(req.body.salary), // 🔥 important
    };

    // ✅ only set department if not empty
    if (req.body.department) {
      updateData.department = req.body.department;
    }

    // ✅ only update image if new file uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updEmployee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updEmployee,
    });

  } catch (error) {
    console.error(error); // 🔥 always log real error
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const delEmployee = await Employee.findByIdAndDelete({ _id: id })
    return res.status(200).json({ success: true, delEmployee })
  }
  catch (error) {
    console.error(error); // 🔥 always log real error
    return res.status(500).json({ success: false, error: "delEmployee Server Error" })
  }
}