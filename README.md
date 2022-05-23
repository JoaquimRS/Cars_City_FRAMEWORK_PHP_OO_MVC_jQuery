# Cars_City_FRAMEWORK_PHP_OO_MVC_jQuery

_Website of second hand cars that allows you to login, register, sign up, see all the cars, filter them and add to favorites_

<!-- ## INDEX

* About this project
* Built With
* Template
* Features
* SecuryLogin
* Working in all website
* License -->

         
## ABOUT THIS PROJECT 

    Simple Website that contains second hand cars.
    Allows you to login and register or sign up with Google and GitHub as well
    Also you can add to favorites the car that you want
    If you want to change the language, no problem, it allows you to choose: Valencian, Spanish and English
    

## BUILT WITH

* [PHP] - Backend
* [JQuery] - Frontend
* [JS] - Frontend


[PHP]: <http://php.net/>
[MVC]: <https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller>
[OOP]: <https://en.wikipedia.org/wiki/Object-oriented_programming>
[jQuery]: <http://jquery.com>
[js]: <https://es.wikipedia.org/wiki/JavaScript>
[JWT]: <https://jwt.io/>
[MailGun]: <https://www.mailgun.com/es/>
[Carousel]: <https://swiperjs.com/>
[Arcana | HTML5 UP]: <https://html5up.net/arcana>
[toastr]: <https://codeseven.github.io/toastr/>
[GMaps]: <https://developers.google.com/maps?hl=es-419>
[Auth0]: <https://auth0.com/es>
[GitHub]: <https://github.com/>
[Google-oauth]: <https://developers.google.com/identity/sign-in/web/sign-in>

## TEMPLATE

* [Arcana | HTML5 UP] - Used for all the aplication.

## FEATURES

| Page | Features |
|---------|-------------|
| Home | Brands([Carousel]), Categories, Fuels and News|
| Shop | Brands-Models, Fuels, Categories, Cities, Cars, Related-Cars, Car-Details, Car-Images([Carousel]), Filter-Cars, Views, Likes|
| Contact | Send contact Us([MailGun])|
| Search | Brands, Categories, Cities, Filter-Cities|
| Login | Login, Verify([MailGun]), Recover-Password([MailGun]), Ask_email, Sign_In, Data-User([JWT]), Logout|
| Secure Login | Control-User, Activity-User, Refresh-Cookie, Refresh-Token([JWT])|


## SECURE LOGIN
* Control-User
   - Check if the **Token-User** is the same as the **Cookie-User**
* Activity-User
   - Check if the **Cookie-User** is **Active** : MAX(**5 min**)
* Refresh-Cookie
   - Generate **New Cookie** if the user is **Active**
* Refresh-Token
   - If the user still active, generate **New Token** that expires in **10 min**

## WORKING IN ALL WEBSITE

* Translate : Spanish, Valencian, English
* Toastr : [toastr]
* GMaps : [GMaps]
* MailGun : [MailGun]
* Middleware : [JWT]
* Auth0 : [Auth0]
  - GitHub : [GitHub]
  - Google : [Google-oauth]
 
