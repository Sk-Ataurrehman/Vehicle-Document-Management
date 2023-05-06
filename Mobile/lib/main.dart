import 'package:flutter/material.dart';
import 'package:mobile_app/pages/home.dart';
import 'package:mobile_app/pages/login.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences pref = await SharedPreferences.getInstance();
  var token = pref.getString("token");
  bool isLoggedIn = token != null ? true : false;
  runApp(MaterialApp(
    title: 'Vehicle Doc',
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      primarySwatch: Colors.blue,
    ),
    home: isLoggedIn ? Home() : Login(),
  ));
}
