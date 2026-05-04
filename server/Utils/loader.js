"use strict";

const superAdmin = require(`${__dirname}/../data/users.json`)[0];

exports.loadSuperAdmin = async () => {
   try {
        const response = await fetch('http://127.0.0.1:5000/api/v2/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(superAdmin)
        });
        
        const result = await response.json();

        if (response.ok) {
            console.log("✅ Admin created successfully!");
        } else if (result.error && result.error.code === 11000) {
            console.log("ℹ️ Admin already exists in the database. Skipping...");
        } else {
            console.log("❌ Error:", result.message || "Something went wrong");
            console.log(result);
        }
   } catch (err) {
        console.log("❌ Connection Error: Ensure your server is running on port 5000");
        console.log(err.message);
   }
}