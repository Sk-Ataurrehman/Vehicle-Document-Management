import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class VehicleInformation extends StatefulWidget {
  final String url;

  VehicleInformation ({
    Key key,
    @required this.url,
  }) : super(key: key);

  @override
  State<VehicleInformation> createState() => _VehicleInformationState();
}

class _VehicleInformationState extends State<VehicleInformation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: WebView(
          initialUrl: widget.url,
          javascriptMode: JavascriptMode.unrestricted,
        )
      ),
    );
  }
}