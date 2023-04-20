import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class VehicleInformation extends StatefulWidget {
  final String url;

  VehicleInformation({
    Key key,
    @required this.url,
  }) : super(key: key);

  @override
  State<VehicleInformation> createState() => _VehicleInformationState();
}

class _VehicleInformationState extends State<VehicleInformation> {
  var jsonData;
  getDetails() async {
    try {
      final url = "http://192.168.0.103:5000/view";
      final account = widget.url.split("/")[4];
      var json = {"account": account};
      var response = await http.post(Uri.parse(url), body: json);
      jsonData = jsonDecode(response.body);
      return jsonData;
    } on SocketException {}
    return [];
  }

  _launchURL(url) async {
    if (await canLaunch(url)) {
      await launch(url);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: FutureBuilder(
            future: getDetails(),
            builder: (context, snapshot) {
              print(snapshot.data);
              var details = snapshot.data["userDetails"];
              var rcHash = snapshot.data["rcDetails"]["0"];
              var puccHash = snapshot.data["pucDetails"]["0"];
              var insuranceHash = snapshot.data["insuranceDetails"]["0"];
              return ListView(
                children: [
                  Container(
                    width: double.infinity,
                    height: 205,
                    child: Card(
                      color: Colors.white,
                      margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                      elevation: 10,
                      child: Column(
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Align(
                            alignment: Alignment.center,
                            child: Text(
                              "User Details",
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Full Name: " + details["fullName"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Email Id: " + details["email"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Phone Number: " + details["phoneno"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Aadhaar Number: " + details["aadharno"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    height: 400,
                    child: Card(
                      color: Colors.white,
                      margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                      elevation: 10,
                      child: Column(
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Align(
                            alignment: Alignment.center,
                            child: Text(
                              "Registration Certificate Details",
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Owner: " + details["rc"][0]["owner"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Vehicle Type: " + details["rc"][0]["type"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Vehicle Manufacturer: " +
                                      details["rc"][0]["manufacturer"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Registration Number: " +
                                      details["rc"][0]["regNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Chassis Number: " + details["rc"][0]["chNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Engine Number: " + details["rc"][0]["engNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Validity: " + details["rc"][0]["validity"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Center(
                              child: ElevatedButton(
                            child: Text("View"),
                            onPressed: () {
                              _launchURL("https://ipfs.io/ipfs/" +
                                  rcHash +
                                  "/image/rc.png");
                            },
                          ))
                        ],
                      ),
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    height: 250,
                    child: Card(
                      color: Colors.white,
                      margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                      elevation: 10,
                      child: Column(
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Align(
                            alignment: Alignment.center,
                            child: Text(
                              "Poluttion Under Control Certificate Details",
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Registration Date: " +
                                      details["pucc"][0]["regDate"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Registration Number: " +
                                      details["pucc"][0]["regNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Certificate: " +
                                      details["pucc"][0]["certificate"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Validity: " + details["pucc"][0]["validity"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Center(
                              child: ElevatedButton(
                            child: Text("View"),
                            onPressed: () {
                              _launchURL("https://ipfs.io/ipfs/" +
                                  puccHash +
                                  "/image/puc.png");
                            },
                          ))
                        ],
                      ),
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    height: 400,
                    child: Card(
                      color: Colors.white,
                      margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                      elevation: 10,
                      child: Column(
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Align(
                            alignment: Alignment.center,
                            child: Text(
                              "Insurance Details",
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Owner: " + details["insurance"][0]["owner"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Vehicle Model: " +
                                      details["insurance"][0]["model"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Registration Number: " +
                                      details["insurance"][0]["regNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Chassis Number: " +
                                      details["insurance"][0]["chNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Engine Number: " +
                                      details["insurance"][0]["engNo"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Policy: " +
                                      details["insurance"][0]["policy"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Align(
                              alignment: Alignment.centerLeft,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(20, 20, 0, 0),
                                child: Text(
                                  "Validity: " +
                                      details["insurance"][0]["validity"],
                                  style: TextStyle(
                                    fontSize: 15,
                                  ),
                                ),
                              )),
                          Center(
                              child: ElevatedButton(
                            child: Text("View"),
                            onPressed: () {
                              _launchURL("https://ipfs.io/ipfs/" +
                                  insuranceHash +
                                  "/image/insurance.png");
                            },
                          ))
                        ],
                      ),
                    ),
                  ),
                ],
              );
            }));
  }
}
