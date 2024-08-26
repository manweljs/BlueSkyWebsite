import React from 'react'

export default function Mining() {
    return (
        <div>
            <h1>{content.title}</h1>


        </div>
    )
}


const content = {
    title: "Training Optimization in the Mining Industry",
    caseStudy: {
        title: "Case Study: Large Coal Mining Operator in Queensland",
        summary: "A major coal mining operator in Queensland successfully reduced the retraining time for 1,500 staff by 28% in preparation for the implementation of autonomous rigs."
    },
    challenges: [
        {
            title: "Training Without Disrupting Operations",
            description: "Training had to be conducted without interrupting ongoing mining operations, considering work schedules, equipment availability, and weather conditions."
        },
        {
            title: "Team Members' Schedules and Rosters",
            description: "Training needed to align with the rotational schedules of the staff, considering the availability of qualified trainers."
        },
        {
            title: "Aligning Training with Operational Needs",
            description: "Some courses had prerequisites, so the order of training needed careful planning. Training that involved equipment required the availability of that equipment."
        }
    ],
    solution: {
        description: "The MetaOPT team developed a model using Machine Learning techniques and IBM Cplex to optimize the training schedule. This model considered various factors such as:",
        factors: [
            "Individual schedules and qualifications",
            "Current roles and minimum staffing requirements",
            "Trainer competencies and availability",
            "Equipment inventory"
        ]
    },
    results: {
        title: "Results",
        outcomes: [
            {
                title: "Reduced Training Time",
                description: "The time required to complete the training was reduced from 12.5 months to 9 months, saving 3.5 months or 28%."
            },
            {
                title: "Operational Efficiency",
                description: "Significant cost savings in training, along with earlier access to the efficiencies of autonomous rigs due to faster training completion."
            }
        ]
    },
    modelFeatures: {
        title: "Model Features",
        features: [
            "Alignment of training schedules with individual roster patterns.",
            "Only qualified trainers were assigned to courses.",
            "High visibility of training burn rate by department and course.",
            "Re-optimization option to handle unexpected events.",
            "No compromise to mining operations with concurrent training activities."
        ]
    },
    developmentProcess: {
        title: "How Was the Solution Developed?",
        description: "MetaOPT scientists worked directly with Training Managers to understand the data required to determine an optimal training plan and the constraints involved."
    }
};
