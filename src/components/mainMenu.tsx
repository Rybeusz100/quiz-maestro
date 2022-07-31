import { ChangeEvent, useState } from 'react';
import { IFile, IMainMenuProps, IQuiz } from '../lib/interfaces';
import { AddQuiz, TextToQuiz } from '../lib/utils';
import QuizCard from './quizCard';

function MainMenu(props: IMainMenuProps) {
  const [currentFile, setCurrentFile] = useState<IFile>();

  function OnFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file === undefined) { return; }
    
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = e => {
      setCurrentFile({
        name: file.name,
        content: e.target?.result?.toString()!
      });
      
    };
    reader.onerror = e => {
      console.error('failed to load file');
    };
  }

  function GenerateQuiz() {
    if (currentFile === undefined || currentFile?.name === null || currentFile?.content === null) { return; }
    const quiz = TextToQuiz(currentFile.name, currentFile.content);
    const newQuizzes = AddQuiz(quiz);
    props.UpdateQuizzes(newQuizzes);
  }

  return (
    <>
      <div className='quizzes-holder'>
        {props.quizzes.map && props.quizzes.map((quiz: IQuiz, index: number) => {
          return (
            <QuizCard quiz={quiz} StartQuiz={props.StartQuiz} EditQuiz={props.EditQuiz} 
              UpdateQuizzes={props.UpdateQuizzes} key={index} />
            )
        })}
      </div>
      <input type='file' accept='.txt, .json' onChange={OnFileUpload}></input>
      <button onClick={GenerateQuiz}>Generate Quiz</button>
    </>
  )
}

export default MainMenu;