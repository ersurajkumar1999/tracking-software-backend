// seedSkills.js
const mongoose = require('mongoose');
const Skill = require('./models/Skill'); // Adjust the path based on your file structure
const connectToDB = require('../utils/db');


// List of skills to seed
const skillsToSeed = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'PHP' },
    { name: 'CodeIgniter' },
    { name: 'Laravel' },
    { name: 'Node.js' },
    { name: 'React' },
    { name: 'Angular' },
    { name: 'Vue.js' },
    { name: 'Java' },
    { name: 'Python' },
    { name: 'Android Development' },
    { name: 'iOS Development' },
    // Add more skills as needed
];

async function seedSkills() {
    await connectToDB();
    try {
        // Clear existing skills (optional, depends on your needs)
        await Skill.deleteMany();

        // Insert new skills
        const createdSkills = await Skill.insertMany(skillsToSeed);
        console.log(`${createdSkills.length} skills seeded successfully`);
    } catch (error) {
        console.error('Error seeding skills:', error.message);
    } finally {
        // Disconnect from database after seeding
        mongoose.disconnect();
    }
}

seedSkills();
