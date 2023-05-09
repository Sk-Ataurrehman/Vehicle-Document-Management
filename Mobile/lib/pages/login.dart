import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile_app/pages/home.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Login extends StatefulWidget {
  var token;
  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  static final emailAddress = TextEditingController();
  static final password = TextEditingController();

  String emailAddressError, passwordError;

  bool passwordVisibility = true;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
        child: ListView(
          children: [
            Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: 20),

                  Text(
                    'Welcome to VehicleDoc',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                  ),

                  SizedBox(height: 30),

                  // Login Image
                  Image.asset('assets/images/login.png'),

                  // Email Address
                  Container(
                    child: TextField(
                      controller: emailAddress,
                      decoration: InputDecoration(
                        prefixIcon: Icon(Icons.email),
                        labelText: 'Email Address',
                        border: OutlineInputBorder(),
                        errorText: emailAddressError,
                      ),
                    ),
                    padding: EdgeInsets.fromLTRB(30, 0, 30, 20),
                  ),

                  // Password
                  Container(
                    child: TextField(
                      obscureText: passwordVisibility,
                      controller: password,
                      decoration: InputDecoration(
                          prefixIcon: Icon(Icons.lock),
                          labelText: 'Password',
                          border: OutlineInputBorder(),
                          errorText: passwordError,
                          suffixIcon: GestureDetector(
                            onTap: () {
                              setState(() {
                                passwordVisibility = !passwordVisibility;
                              });
                            },
                            child: Icon(passwordVisibility
                                ? Icons.visibility
                                : Icons.visibility_off),
                          )),
                    ),
                    padding: EdgeInsets.fromLTRB(30, 0, 30, 20),
                  ),

                  isLoading
                      ? CircularProgressIndicator()
                      : Container(
                          child: TextButton(
                            style: TextButton.styleFrom(
                              primary: Colors.white,
                              backgroundColor: Colors.lightBlueAccent[700],
                              textStyle: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.bold),
                            ),
                            child: Text('LOGIN'),
                            onPressed: () async {
                              if (mounted) {
                                setState(() {
                                  isLoading = true;
                                  verifyCop();
                                });
                              }
                            },
                          ),
                          width: double.infinity,
                          padding: EdgeInsets.fromLTRB(30, 0, 30, 0),
                        )
                ])
          ],
        ),
      ),
    );
  }

  verifyCop() async {
    if (emailAddress.text.isEmpty) {
      setState(() {
        emailAddressError = 'Email Address is compulsory';
        isLoading = false;
      });
    } else {
      setState(() {
        emailAddressError = null;
        isLoading = false;
      });
    }

    if (password.text.isEmpty) {
      setState(() {
        passwordError = "Password can't be Empty";
        isLoading = false;
      });
    } else {
      setState(() {
        passwordError = null;
        isLoading = false;
      });
    }

    Map data = {"email": emailAddress.text, "password": password.text};
    print("Email Address: " + data['email']);
    print("Password: " + data['password']);

    var response = await http
        .post(Uri.parse("http://192.168.0.110:5000/cop/login"), body: data);

    print("Status Code: " + response.statusCode.toString());
    if (response.statusCode == 200) {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
      var jsonData = jsonDecode(response.body);
      print(jsonData);
      final snackBar = SnackBar(
        content: Text(jsonData['msg']),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      print(jsonData['token']);
      SharedPreferences pref = await SharedPreferences.getInstance();
      pref.setString("token", jsonData['token']);
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => Home()));
    } else {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
      var jsonData = jsonDecode(response.body);
      final snackBar = SnackBar(
        content: Text(jsonData['msg']),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
    }
  }
}
