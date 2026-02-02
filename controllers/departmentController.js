import Department from "../models/Department.js"

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(201).json({ success: true, departments })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: "Data Not fetched from server" })
    }
}

const add = async (req, res) => {

    const { dep_name, description } = req.body;
    try {
        const newDep = new Department(
            {
                dep_name,
                description
            }
        )

        await newDep.save()
        return res.status(200).json({ success: true, department: newDep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "DataBase Server Error" })
    }
}

const getDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findById({ _id: id })
        return res.status(200).json({ success: true, department })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: "getDepartment Server Error" })
    }
}


const updateDepartment = async (req, res) => {
    try {

        const { id } = req.params;
        const { dep_name, description } = req.body;

        const updDep = await Department.findByIdAndUpdate(
            { _id: id },
            { dep_name, description }
        )

        console.log(updDep)

        return res.status(200).json({ success:true, updDep })

    }
    catch (error) {
        return res.status(500).json({ success: false, error: 'updateDepartment Server Error' })
    }
}

const deleteDepartment = async (req, res) => {
    try{
        const {id} = req.params;
        const delDep = await Department.findByIdAndDelete({_id: id})
        return res.status(200).json({ success: true, delDep })
    }
    catch(error){
        return res.status(500).json({ success: false, error: 'deleteDepartment Server Error' })
    }
    
}

export { add, getDepartments, getDepartment, updateDepartment, deleteDepartment }