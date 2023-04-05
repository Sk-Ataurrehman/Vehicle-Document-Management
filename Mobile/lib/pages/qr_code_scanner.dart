import 'package:flutter/material.dart';
import 'package:flutter_qr_bar_scanner/qr_bar_scanner_camera.dart';
import 'package:mobile_app/pages/vehicle_information.dart';

class QRCodeScanner extends StatefulWidget {

  @override
  State<QRCodeScanner> createState() => _QRCodeScannerState();
}

class _QRCodeScannerState extends State<QRCodeScanner> {
  String _qrInfo = 'Scan a QR/Bar code';
  bool camState = false;
  String titleText = 'Scanner';

  qrCallback(String code) {
    setState(() {
      camState = false;
      _qrInfo = code;
    });
  }

  @override
  void initState() {
    super.initState();
    setState(() {
      camState = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(titleText),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          if (camState == true) {
            setState(() {
              camState = false;
              titleText = 'Vehicle Details';
            });
          } else {
            setState(() {
              camState = true;
              titleText = 'Scanner';
            });
          }
        },
        child: Icon(Icons.camera_alt_rounded),
      ),
      body: camState
          ? Center(
              child: SizedBox(
                height: 1000,
                width: 500,
                child: Center(
                  child: QRBarScannerCamera(
                    onError: (context, error) => Text(
                      error.toString(),
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.red),
                    ),
                    qrCodeCallback: (code) {
                      qrCallback(code);
                    },
                  ),
                ),
              ),
            )
          : VehicleInformation(url: _qrInfo)
    );
  }
}
