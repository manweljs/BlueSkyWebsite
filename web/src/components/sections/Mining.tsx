import React from 'react'
import s from "./Section.module.sass"
import { cls } from '@/utils';
import Image from 'next/image';
import { FIcon } from '../ui/FIcon';

export default function Mining() {
    return (
        <div className={cls(s.section, s.mining)}>
            <h1>{content.title}</h1>

            <section className={s.case_study}>
                <h2>{content.caseStudy.title}</h2>
                <div className={s.image}>
                    <Image src={content.caseStudy.img} alt={content.title} width={800} height={400} />
                </div>
                <p>{content.caseStudy.summary}</p>
            </section>

            <section>
                <h2>Challenges</h2>
                <div className={s.challenges}>
                    {content.challenges.map((challenge, index) => (
                        <div key={index} className={s.challenge}>
                            <h4>{challenge.title}</h4>
                            <p>{challenge.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Solution</h2>
                <p>{content.solution.description}</p>
                <ul>
                    {content.solution.factors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Results</h2>
                <div className={s.results}>
                    {content.results.outcomes.map((outcome, index) => (
                        <div key={index} className={s.result} >
                            <div className={s.mb3}>
                                <FIcon name={outcome.icon} size={30} primary />
                            </div>
                            <h4>{outcome.title}</h4>
                            <p>{outcome.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>{content.modelFeatures.title}</h2>
                <ul>
                    {content.modelFeatures.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>

            </section>

            <section>
                <h2>{content.developmentProcess.title}</h2>
                <p>{content.developmentProcess.description}</p>

            </section>


        </div>
    )
}


const content = {
    title: "Training Optimization in the Mining Industry",
    caseStudy: {
        title: <span><strong>Case Study: </strong> Large Coal Mining Operator in Queensland</span>,
        img: "/img/sections/BHP.jpg",
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
                icon: "fi-rr-pending",
                title: "Reduced Training Time",
                description: "The time required to complete the training was reduced from 12.5 months to 9 months, saving 3.5 months or 28%."
            },
            {
                icon: "fi-rr-calendar-check",
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
        description: <span><a href="https://meta-optimize.com/" target='_blank'>MetaOPT</a> scientists worked directly with Training Managers to understand the data required to determine an optimal training plan and the constraints involved.</span>
    }
};
