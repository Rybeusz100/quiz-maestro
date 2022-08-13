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
        type: file.type,
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

    let quiz: IQuiz = {id: '0', title: '', questions: []};
    switch (currentFile.type) {
      case 'text/plain':
        quiz = TextToQuiz(currentFile.name, currentFile.content);
        break;
      case 'application/json':
        quiz = JSON.parse(currentFile.content);
        break;
    }

    const newQuizzes = AddQuiz(quiz);
    props.UpdateQuizzes(newQuizzes);
  }

  return (
    <>
      <div className='top-nav'>
        <input type='file' accept='.txt, .json' onChange={OnFileUpload} id='input-file'></input>
        <button onClick={() => document.getElementById('input-file')?.click()}>{currentFile?.name || 'Select file'}</button>
        <button onClick={GenerateQuiz}>Generate Quiz</button>
      </div>
      <div className='quiz-list'>
        {props.quizzes.map && props.quizzes.map((quiz: IQuiz, index: number) => {
          return (
            <QuizCard quiz={quiz} StartQuiz={props.StartQuiz} EditQuiz={props.EditQuiz} 
              UpdateQuizzes={props.UpdateQuizzes} key={index} />
            )
        })}
      </div>
    </>
  )
}

export default MainMenu;