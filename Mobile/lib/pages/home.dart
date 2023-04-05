import 'package:flutter/material.dart';
import 'package:mobile_app/pages/qr_code_scanner.dart';

class Home extends StatefulWidget {

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      
      body: QRCodeScanner()
    );
  }

}