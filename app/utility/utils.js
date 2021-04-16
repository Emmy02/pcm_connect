const getRecordId = (id, attribute, arr) => {
  let response = null;

  arr.map((a) => {
    if (a[attribute] === id) response = a.id;
  });

  return response;
};

const getCareerCategories = () => {
  return [
    {
      backgroundColor: "#26de81",
      label: "architecture_and_design",
      icon: "ruler-square",
      value: 1,
    },
    {
      backgroundColor: "#2bcbba",
      label: "social_sciences_and_government",
      icon: "social-distance-2-meters",
      value: 2,
    },
    {
      backgroundColor: "#45aaf2",
      label: "humanities_and_education",
      icon: "book-education-outline",
      value: 3,
    },
    {
      backgroundColor: "#2bcbba",
      label: "bioengineering_and_chemical_processes",
      icon: "test-tube",
      value: 4,
    },
    {
      backgroundColor: "#45aaf2",
      label: "applied_science",
      icon: "microscope",
      value: 5,
    },
    {
      backgroundColor: "#4b7bec",
      label: "computer_science_and_information_technology",
      icon: "laptop",
      value: 6,
    },
    {
      backgroundColor: "#a55eea",
      label: "innovation_and_transformation",
      icon: "train-car",
      value: 7,
    },
    {
      backgroundColor: "#fc5c65",
      label: "medicine_and_health_sciences",
      icon: "needle",
      value: 8,
    },
    {
      backgroundColor: "#778ca3",
      label: "business_school",
      icon: "card-account-details-outline",
      value: 9,
    },
  ];
};

export { getRecordId, getCareerCategories };
