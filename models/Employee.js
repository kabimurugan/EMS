import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    employee_id: { type: String, required: true, unique: true },
    dob: Date,
    gender: String,
    marital_status: String,
    designation: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    salary: Number,
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },
    password: { type: String, required: true },
    image: String,
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee