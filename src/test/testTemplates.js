const currentTimestamp = Date.now();
export const testTemplates = [
  {
    id: 1,
    creating_user: 101,
    type: "urine control",
    name: "Urine Test Template 1",
    creation_date: new Date().toISOString().split("T")[0], // 9 days ago
    description: "Additional info for template 1", // New column
    last_modified: (currentTimestamp - 86400000 * 9).toString() // Assuming last_modified is the same as creation_date for now
  },
  {
    id: 2,
    creating_user: 102,
    type: "serum control",
    name: "Serum Test Template 1",
    creation_date: new Date().toISOString().split("T")[0], // 8 days ago
    description: "Additional info for template 2",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 3,
    creating_user: 103,
    type: "urine control",
    name: "Urine Test Template 2",
    creation_date: new Date().toISOString().split("T")[0], // 7 days ago
    description: "Additional info for template 3",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 4,
    creating_user: 104,
    type: "serum control",
    name: "Serum Test Template 2",
    creation_date: new Date().toISOString().split("T")[0], // 6 days ago
    description: "Additional info for template 4",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 5,
    creating_user: 105,
    type: "urine control",
    name: "Urine Test Template 3",
    creation_date: new Date().toISOString().split("T")[0], // 5 days ago
    description: "Additional info for template 5",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 6,
    creating_user: 106,
    type: "serum control",
    name: "Serum Test Template 3",
    creation_date: new Date().toISOString().split("T")[0], // 4 days ago
    description: "Additional info for template 6",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 7,
    creating_user: 107,
    type: "urine control",
    name: "Urine Test Template 4",
    creation_date: new Date().toISOString().split("T")[0], // 3 days ago
    description: "Additional info for template 7",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 8,
    creating_user: 108,
    type: "serum control",
    name: "Serum Test Template 4",
    creation_date: new Date().toISOString().split("T")[0], // 2 days ago
    description: "Additional info for template 8",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 9,
    creating_user: 109,
    type: "urine control",
    name: "Urine Test Template 5",
    creation_date: new Date().toISOString().split("T")[0], // 1 day ago
    description: "Additional info for template 9",
    last_modified: new Date().toISOString().split("T")[0]
  },
  {
    id: 10,
    creating_user: 110,
    type: "serum control",
    name: "Serum Test Template 5",
    creation_date: new Date().toISOString().split("T")[0], // current time
    description: "Additional info for template 10",
    last_modified: new Date().toISOString().split("T")[0] // Assuming last_modified is the same as creation_date for now
  }
];