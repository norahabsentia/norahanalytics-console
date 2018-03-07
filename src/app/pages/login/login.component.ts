import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private afAuth: AngularFireAuth,
               private router: Router) {
  }

  ngOnInit(){}

  login(form: NgForm) {
    this.afAuth.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
      .then( (user) => {
        this.router.navigate(['/pages/dashboard']);
      })
      .catch(
        (err) => alert(err.message)
      );
  }
}
