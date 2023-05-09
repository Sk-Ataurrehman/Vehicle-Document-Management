import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/pages/login.dart';
import 'package:shared_preferences/shared_preferences.dart';
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
    SharedPreferences pref = await SharedPreferences.getInstance();
    var token = pref.getString("token");
    try {
      final url = "http://192.168.0.110:5000/view";
      final account = widget.url.split("/")[4];
      var json = {"account": account};
      var response = await http
          .post(Uri.parse(url), body: json, headers: {"authorization": token});
      jsonData = jsonDecode(response.body);
      print(jsonData);
      return jsonData;
    } on SocketException {}
    return [];
  }

  _launchURL(url) async {
    var uri = Uri.parse(url);
    await launch(url);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: FutureBuilder(
            future: getDetails(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                var details = snapshot.data["userDetails"];
                var rcHash = snapshot.data["rcDetails"]["0"];
                var puccHash = snapshot.data["pucDetails"]["0"];
                var insuranceHash = snapshot.data["insuranceDetails"]["0"];
                return ListView(
                  children: [
                    Container(
                      width: double.infinity,
                      height: 400,
                      margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                      child: Card(
                        margin: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                "User Details",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Divider(),
                            ListTile(
                              title: Text("Full Name"),
                              subtitle: Text(details["fullName"]),
                            ),
                            ListTile(
                              title: Text("Email Address"),
                              subtitle: Text(details["email"]),
                            ),
                            ListTile(
                              title: Text("Phone Number"),
                              subtitle: Text(details["phoneno"]),
                            ),
                            ListTile(
                              title: Text("Aadhaar Number"),
                              subtitle: Text(details["aadharno"]),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      height: 675,
                      child: Card(
                        margin: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                "Registration Certificate Details",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Divider(),
                            ListTile(
                              title: Text("Owner"),
                              subtitle: Text(details["rc"][0]["owner"]),
                            ),
                            ListTile(
                              title: Text("Vehicle Type"),
                              subtitle: Text(details["rc"][0]["type"]),
                            ),
                            ListTile(
                              title: Text("Vehicle Manufacturer"),
                              subtitle: Text(details["rc"][0]["manufacturer"]),
                            ),
                            ListTile(
                              title: Text("Registration Number"),
                              subtitle: Text(details["rc"][0]["regNo"]),
                            ),
                            ListTile(
                              title: Text("Chassis Number"),
                              subtitle: Text(details["rc"][0]["chNo"]),
                            ),
                            ListTile(
                              title: Text("Engine Number"),
                              subtitle: Text(details["rc"][0]["engNo"]),
                            ),
                            ListTile(
                              title: Text("Validity"),
                              subtitle: Text(details["rc"][0]["validity"]),
                            ),
                            Center(
                                child: ElevatedButton(
                              child: Text("View RC"),
                              onPressed: () {
                                _launchURL("https://ipfs.io/ipfs/" +
                                    rcHash +
                                    "/image/rc.png");
                              },
                            )),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      height: 480,
                      child: Card(
                        margin: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                "Poluttion Under Control Certificate Details",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Divider(),
                            ListTile(
                              title: Text("Registration Date"),
                              subtitle: Text(details["pucc"][0]["regDate"]),
                            ),
                            ListTile(
                              title: Text("Registration Number"),
                              subtitle: Text(details["pucc"][0]["regNo"]),
                            ),
                            ListTile(
                              title: Text("Certificate"),
                              subtitle: Text(details["pucc"][0]["certificate"]),
                            ),
                            ListTile(
                              title: Text("Validity"),
                              subtitle: Text(details["pucc"][0]["validity"]),
                            ),
                            Center(
                                child: ElevatedButton(
                              child: Text("View PUCC"),
                              onPressed: () {
                                _launchURL("https://ipfs.io/ipfs/" +
                                    puccHash +
                                    "/image/puc.png");
                              },
                            )),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      height: 675,
                      child: Card(
                        margin: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                "Insurance Details",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Divider(),
                            ListTile(
                              title: Text("Owner"),
                              subtitle: Text(details["rc"][0]["owner"]),
                            ),
                            ListTile(
                              title: Text("Vehicle Model"),
                              subtitle: Text(details["insurance"][0]["model"]),
                            ),
                            ListTile(
                              title: Text("Registration Number"),
                              subtitle: Text(details["insurance"][0]["regNo"]),
                            ),
                            ListTile(
                              title: Text("Chassis Number"),
                              subtitle: Text(details["insurance"][0]["chNo"]),
                            ),
                            ListTile(
                              title: Text("Engine Number"),
                              subtitle: Text(details["insurance"][0]["engNo"]),
                            ),
                            ListTile(
                              title: Text("Policy"),
                              subtitle: Text(details["insurance"][0]["policy"]),
                            ),
                            ListTile(
                              title: Text("Validity"),
                              subtitle:
                                  Text(details["insurance"][0]["validity"]),
                            ),
                            Center(
                                child: ElevatedButton(
                              child: Text("View Insurance"),
                              onPressed: () {
                                _launchURL("https://ipfs.io/ipfs/" +
                                    insuranceHash +
                                    "/image/insurance.png");
                              },
                            )),
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              } else {
                return Center(child: CircularProgressIndicator());
              }
            }));
  }
}
