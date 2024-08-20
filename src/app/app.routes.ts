import { Routes } from '@angular/router';
import { MyQuizzesComponent } from './components/my-quizzes/my-quizzes.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';

export const routes: Routes = [
  { path: 'my-quizzes', component: MyQuizzesComponent },
  { path: '', component: QuizzesComponent },
  { path: 'home', component: QuizzesComponent },
  { path: 'login', component: UserLoginComponent},
  { path: 'register', component: UserRegisterComponent},
  { path: 'my-profile', component: UserProfileComponent},
  { path: 'play', component: PlayQuizComponent}
];
