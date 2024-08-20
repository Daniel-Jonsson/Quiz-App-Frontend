/**
 * Backend service class for communication with the database through backend endpoints.
 * @author Daniel Jönsson, Robert Kullman
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Quiz } from '../interfaces/quiz';
import { QuizSubject } from '../interfaces/quizSubject';
import { User } from '../interfaces/user';
import { NewQuizService } from './new-quiz.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class BackendService implements OnDestroy {
  readonly BASE_API_URL =
    'https://dajo1903-project-ht23-backend-dt190g.azurewebsites.net/api/v1';
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private newQuizService: NewQuizService
  ) {}

  /**
   * Checks the users login status.
   * @returns response containing login status information.
   */
  checkLoginStatus(): Observable<object> {
    const url = `${this.BASE_API_URL}/users/isSignedIn`;
    return this.http.get(url, httpOptions);
  }

  /**
   * Unsubscribes to the isLoggedInSubject upon component destruction.
   */
  ngOnDestroy(): void {
    this.isLoggedInSubject.unsubscribe();
  }

  /**
   * Retrieves all available quizzes from the database via backend.
   * @returns Observable emitting all available quizzes.
   */
  getQuizzes(): Observable<Quiz[]> {
    const url = `${this.BASE_API_URL}/quizzes`;
    return this.http.get<Quiz[]>(url);
  }

  /**
   * Retrieves all quizzes made by the current user from the database via backend.
   * @returns Observable emitting all quizzes made by the logged in user.
   */
  getMyQuizzes(): Observable<Quiz[]> {
    const url = `${this.BASE_API_URL}/quizzes/my`;
    return this.http.get<Quiz[]>(url, httpOptions);
  }

  /**
   * Retrieves the current user information from the database via backend.
   * @returns Observable emitting a User object representing the current user.
   */
  getCurrentUser(): Observable<User> {
    const url = `${this.BASE_API_URL}/users/me`;
    return this.http.get<User>(url, httpOptions);
  }

  /**
   * Deletes the quiz with _id corresponding to the _id parameter from the database.
   * @param _id the _id property of the quiz to be deleted from the database.
   * @returns Observable emitting a Quiz object representing the deleted quiz.
   */
  deleteMyQuiz(_id: string): Observable<Quiz> {
    const url = `${this.BASE_API_URL}/quizzes/${_id}`;
    return this.http.delete<Quiz>(url, httpOptions);
  }

  /**
   * Attempts to log in a user based on the provided login credentials.
   * @param username the username of the profile trying to log in.
   * @param password the password for the user.
   * @returns session information, if successful
   */
  logIn(username: string, password: string): Observable<void> {
    const url = `${this.BASE_API_URL}/users/login`;
    return this.http
      .post(
        url,
        {
          userName: username,
          password: password,
        },
        httpOptions
      )
      .pipe(map(() => this.isLoggedInSubject.next(true)));
  }

  /**
   * Attempts to log the user out.
   * @returns JSON object containing success of failure information.
   */
  logOut(): Observable<void> {
    const url = `${this.BASE_API_URL}/users/logout`;
    return this.http
      .get(url, httpOptions)
      .pipe(map(() => this.isLoggedInSubject.next(false)));
  }

  /**
   * Creates a new user profile based on the User object parameter.
   * @param newUser User object containing the new user information.
   * @returns the registered user Object
   */
  register(newUser: User): Observable<object> {
    const url = `${this.BASE_API_URL}/users/signup`;
    return this.http.post(url, newUser);
  }

  /**
   * Checks whether the user is currently logged in.
   * @returns Observable emitting boolean indicating whether the user is logged in.
   */
  isLoggedInCheck(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /**
   * Retrieves all the subjects from the database via backend.
   * @returns Observable emitting all subjects stored in the database.
   */
  getSubjects(): Observable<QuizSubject[]> {
    const url = `${this.BASE_API_URL}/subjects`;
    return this.http.get<QuizSubject[]>(url, httpOptions);
  }

  /**
   * Adds a new quiz to the database.
   * @param quizData Object containing the necessary quiz information.
   * @returns the new Quiz object.
   */
  addNewQuiz(quizData: object): Observable<Quiz> {
    const url = `${this.BASE_API_URL}/quizzes`;
    return this.http.post<Quiz>(url, quizData, httpOptions).pipe(
      map((newQuiz) => {
        this.newQuizService.addQuiz(newQuiz);
        return newQuiz;
      })
    );
  }

  /**
   * Fetches a specific quest from the database based on the _id parameter.
   * @param _id the _id property of the quiz to be retrieved.
   * @returns Quiz corresponding to the provided _id.
   */
  getQuiz(_id: string): Observable<Quiz> {
    const url = `${this.BASE_API_URL}/quizzes/${_id}`;
    return this.http.get<Quiz>(url, httpOptions);
  }

  /**
   * Updates an existing quiz in the database.
   * @param _id _id property of the quiz to be updated.
   * @param quiz Quiz object with updated quiz information.
   * @returns updated Quiz object
   */
  updateQuiz(_id: string, quiz: Quiz): Observable<Quiz> {
    const url = `${this.BASE_API_URL}/quizzes/${_id}`;
    return this.http.put<Quiz>(url, quiz, httpOptions);
  }
}
