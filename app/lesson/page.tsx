import { getLesson } from '@/db/queries'
import React from 'react'
import { getUserProgress } from '../../db/queries';
import { redirect } from 'next/navigation';
import { LessonButton } from '../(main)/learn/lesson-button';
import Quiz from './quiz';

const LessonPage = async () => {
   const lessonData  = getLesson();
   const userProgressData = getUserProgress();
  
   const [lesson, userProgress] = await Promise.all([lessonData, userProgressData])

   if(!lesson || !userProgress) {
       redirect("/learn")
   }

   const intialPercentage = lesson.challenges.filter((challenge) =>  challenge.completed).length / lesson.challenges.length * 100;

  return (
    <Quiz
        intialLessonId={lesson.id}
        intialLessonChallenges={lesson.challenges}
        intialHearts={userProgress.hearts}
        intialPercentage={intialPercentage}
        userSubscription={undefined}
    />
  )
}

export default LessonPage