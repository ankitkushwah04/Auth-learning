import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-oauth2-success',
  template: '', // no HTML needed
})
export class Oauth2SuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      console.log("Token.........");
      this.tokenService.token = token;
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

