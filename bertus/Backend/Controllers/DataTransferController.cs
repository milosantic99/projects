using Bertus_Igrannonica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Bertus_Igrannonica.Hosts;
using Microsoft.VisualBasic.FileIO;
using CsvHelper;
using System.Globalization;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace Bertus_Igrannonica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataTransferController : ControllerBase
    {

        private static Table test = new Table();
        private static readonly HttpClient client = new HttpClient();
        private readonly IConfiguration _configuration;
        private static String username1 { get; set; }
        private static String filename1 { get; set; }
        private static String foldername1 { get; set; }

        public static List<String[]> data = new List<String[]>();
        public DataTransferController(IConfiguration configuration)
        {

            _configuration = configuration;
        }


        //[HttpPost("sendToFastAPI")]
        //public async Task<string> sendData(JSONReceive json)
        //{
        //    var jsonConvert = JsonConvert.SerializeObject(json, Formatting.Indented);
        //    var stringContent = new StringContent(jsonConvert);
        //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //    var response = await client.PostAsync("http://127.0.0.1:8000/docs#/default/readData_getData_get", stringContent);
        //    var responseString = await response.Content.ReadAsStringAsync();
        //    return responseString;
        //}

        [HttpPost("getFile")]
        public async Task<IActionResult> GetFile(JSONFile json)
        {
            Console.WriteLine(json.filename);
            return Ok("123");
        }



        [HttpPost("getInfoFromFrontend")]
        public async Task<IActionResult> PostString(JSONReceive json)
        {

            //String[] x = json.filename.Split(".");
            string problemName = json.problem_name;
            string username = json.username;
            string modelName = json.model_name;

            string dirPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", json.username, @"Models", problemName);
            if (!Directory.Exists(dirPath))
            {

                Directory.CreateDirectory(dirPath);
            }

            /*DirectoryInfo di = new DirectoryInfo(dirPath);
            DirectoryInfo[] directories = di.GetDirectories();
            int noOfDirs = directories.Count();

            string subDirPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", json.username, @"Models", problemName, x[0] + noOfDirs);
            if (!Directory.Exists(subDirPath)) {

                Directory.CreateDirectory(subDirPath);
            }*/

            //json.foldername = x[0] + noOfDirs; //setovanje subfoldera u kom se nalaze hiperparametri i u kom treba da se cuva h5 fajl

            //pravljenje foldera za model:
            string subDirPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", json.username, @"Models", problemName, modelName);
            if (Directory.Exists(subDirPath))
            { //ime modela postoji, naci sledeci prvi inkrement koji ne ne postoji

                for (int i = 1; i < 1000; i++)
                {

                    string pathToCkeck = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", json.username, @"Models", problemName);
                    string nthDirectoryName = modelName;

                    nthDirectoryName = nthDirectoryName + "_" + i; //inkrementacija za folder_0, folder_1, folder_2
                    pathToCkeck = Path.Combine(pathToCkeck, nthDirectoryName);

                    if (!Directory.Exists(pathToCkeck))
                    {

                        json.model_name = nthDirectoryName;
                        subDirPath = pathToCkeck;
                        Directory.CreateDirectory(subDirPath);

                        break;
                    }
                }
            }
            else
            { //ime modela ne postoji, pravi se folder u kom ce se smestiti hiperp. i model

                Directory.CreateDirectory(subDirPath);
            }

            string filePath = Path.Combine(subDirPath, @"hyperparameters.csv");
            if (!System.IO.File.Exists(filePath))
            {
                //Console.WriteLine("test: {0}", pathToSave);
                var newFile = System.IO.File.Create(filePath);
                newFile.Close();
            }

            using (var textWriter = new StreamWriter(filePath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture))
            {

                //upisivanje parametara u csv
                writer.WriteField("activation_type");
                writer.WriteField("regularization_type");
                writer.WriteField("problem_type");
                writer.WriteField("optimizer_type");
                writer.WriteField("loss_type");
                writer.WriteField("encode_type");
                writer.WriteField("outlier_type");
                //writer.WriteField("replace_number_type");
                //writer.WriteField("replace_cat_type");
                writer.NextRecord();
                writer.WriteField(json.activation_type);
                writer.WriteField(json.regularization_rate);
                writer.WriteField(json.problem_type);
                writer.WriteField(json.optimizer_type);
                writer.WriteField(json.loss_type);
                writer.WriteField(json.encode_type);
                writer.WriteField(json.outlier_type);
                //writer.WriteField(json.replace_number_type);
                //writer.WriteField(json.replace_cat_type);
                writer.NextRecord();

                //upisivanje inputa u csv
                writer.WriteField("inputs");
                writer.NextRecord();
                foreach (int y in json.inputs)
                    writer.WriteField(y);
                writer.NextRecord();

                //upisivanje u csv
                writer.WriteField("output");
                writer.WriteField("hiddenLayerCounter");
                writer.WriteField("epoch");
                writer.NextRecord();
                writer.WriteField(json.output);
                writer.WriteField(json.hiddenLayerCounter);
                writer.WriteField(json.epoch);
                writer.NextRecord();

                //upisivanje broja neurona po sloju u csv
                writer.WriteField("neuronArray");
                writer.NextRecord();
                foreach (int y in json.neuronArray)
                    writer.WriteField(y);
                writer.NextRecord();

                //upisivanje floata u csv
                writer.WriteField("learning_rate");
                writer.WriteField("regularization_rate");
                writer.NextRecord();
                writer.WriteField(json.learning_rate);
                writer.WriteField(json.regularization_rate);
                writer.NextRecord();

                //upisivanje stringova
                writer.WriteField("filename");
                writer.WriteField("connectionId");
                writer.WriteField("username");
                writer.NextRecord();
                writer.WriteField(json.filename);
                writer.WriteField(json.connectionId);
                writer.WriteField(json.username);
                writer.NextRecord();

                //upisivanje u csv imena inputa
                for (int i = 0; i < json.inputs.Count; i++)
                    if (json.inputs.ElementAt(i) == 1)
                        writer.WriteField(json.headers.ElementAt(i));
                writer.NextRecord();

                //upis outputa u csv fajl
                writer.WriteField(json.headers.ElementAt(json.output));
                writer.NextRecord();

                writer.WriteField(json.train_validation_ratio);
                writer.NextRecord();
            }


            Console.WriteLine("new-" + json.replace_cat_type);
            Console.WriteLine("Actiovation id - " + json.activation_type);
            /*
            Console.WriteLine("learning_rate id - " + json.learning_rate_id);
            Console.WriteLine("regularization_rate id - " + json.regularization_rate_id);
            Console.WriteLine("replace id - " + json.replace_type);
            */
            Console.WriteLine("regularization_type - " + json.regularization_type);
            Console.WriteLine("problem_type - " + json.problem_type);
            Console.WriteLine("optimizer_type - " + json.optimizer_type);
            Console.WriteLine("loss_type - " + json.loss_type);
            Console.WriteLine("encode_type - " + json.encode_type);

            Console.WriteLine("inputs");
            foreach (int z in json.inputs)
                Console.Write(z + " ");

            Console.WriteLine("output " + json.output);
            Console.WriteLine("Connection id " + json.connectionId);


            //pravljenje fajla u kom ce pisati tacno enkodiranje po kolonama
            string encodingPath = Path.Combine(subDirPath, @"encoding.csv");
            if (!System.IO.File.Exists(encodingPath))
            {
                var newFile = System.IO.File.Create(encodingPath);
                newFile.Close();
            }
            //upisivanje enkodiranja u fajl
            using (var textWriter = new StreamWriter(encodingPath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture))
            {

                for (int i = 0; i < json.headers.Count; i++)
                {
                    if (json.output != i && json.inputs.ElementAt(i) == 1)
                    {
                        writer.WriteField(json.headers.ElementAt(i));
                        writer.WriteField(json.data_type.ElementAt(i));
                        writer.WriteField(json.encode_type.ElementAt(i));
                        writer.NextRecord();
                    }
                }
            }


            Console.WriteLine("Stigao dovde.");
            Console.WriteLine("LINK ZA FAST API: " + _configuration.GetConnectionString("FastAPIConnection") + "netToFastAPI");
            Console.WriteLine(_configuration.GetConnectionString("FastAPIConnection"));

            var endpoint = new Uri(_configuration.GetConnectionString("FastAPIConnection") + "netToFastAPI");

            Console.WriteLine("Prosao.");

            var jsonConvert = JsonConvert.SerializeObject(json);
            var payload = new StringContent(jsonConvert, Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content;


            JObject problem = JObject.Parse(result.ReadAsStringAsync().Result);


            //########## PISANJE MATRICE ZA PREDIKCIJU I VRACANJE MATRICA NAZAD NA FRONT ZA PREDIKCIJU #############

            var matrica = problem["matrica_za_predikciju"];

            //cuvanje matrice za prediktovanje u txt fajlu:
            //string predictPath = Path.Combine(subDirPath, @"predictMatrix.txt");
            //if (!System.IO.File.Exists(predictPath)) {
            //    //Console.WriteLine("test: {0}", pathToSave);
            //    var newFile = System.IO.File.Create(predictPath);
            //    newFile.Close();
            //}

            //using (var textWriter = new StreamWriter(predictPath)){

            //    textWriter.Write(matrica);
            //}

            List<NumericMatrixValue> numericValues = new List<NumericMatrixValue>();
            List<CategoricalMatrixValue> categoricalValues = new List<CategoricalMatrixValue>();


            foreach (var x in matrica)
            {

                //za brojeve-> 0
                if (int.Parse(x.First().ToString()) == 0)
                {
                    //foreach (var y in x.ToArray()) {
                    //    int label = int.Parse(x.First().ToString());

                    //}
                    int label = int.Parse(x.First().ToString());
                    string headerName = x.ElementAt(1).ToString();

                    numericValues.Add(new NumericMatrixValue(label, headerName));
                }


                //za stringove-> 1
                if (int.Parse(x.First().ToString()) == 1)
                {

                    CategoricalMatrixValue catMatrixValue = new CategoricalMatrixValue();

                    catMatrixValue.label = int.Parse(x.First().ToString());
                    catMatrixValue.headerName = x.ElementAt(1).ToString();
                    catMatrixValue.randomNumber = int.Parse(x.ElementAt(2).ToString());
                    catMatrixValue.numberOfValues = int.Parse(x.ElementAt(3).ToString());

                    List<string> values = new List<string>();

                    foreach (var y in x.ToArray())
                    {

                        foreach (var z in y.ToArray())
                        {
                            values.Add(z.ToString());

                        }
                    }

                    catMatrixValue.values = values;

                    categoricalValues.Add(catMatrixValue);
                }
            }


            //pravljenje fajla u kom ce pisati kategorijske vrednosti za matricu predikcije
            string catPath = Path.Combine(subDirPath, @"categoricalValues.csv");
            if (!System.IO.File.Exists(catPath))
            {
                var newFile = System.IO.File.Create(catPath);
                newFile.Close();
            }

            using (var textWriter = new StreamWriter(catPath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture))
            {

                foreach (CategoricalMatrixValue c in categoricalValues)
                {

                    writer.WriteField(c.label);
                    writer.WriteField(c.headerName);
                    writer.WriteField(c.randomNumber);
                    writer.WriteField(c.numberOfValues);

                    foreach (string s in c.values)
                    {
                        writer.WriteField(s);
                    }

                    writer.NextRecord();
                }
            }


            //pravljenje fajla u kom ce pisati numericke vrednosti za matricu predikcije
            string numPath = Path.Combine(subDirPath, @"numericalValues.csv");
            if (!System.IO.File.Exists(numPath))
            {
                var newFile = System.IO.File.Create(numPath);
                newFile.Close();
            }

            using (var textWriter = new StreamWriter(numPath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture))
            {

                foreach (NumericMatrixValue n in numericValues)
                {

                    writer.WriteField(n.label);
                    writer.WriteField(n.headerName);

                    writer.NextRecord();
                }
            }





            string matrixPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", problem["username"].ToString(),
                @"Models", problem["problem_name"].ToString(), problem["model_name"].ToString(), "matrix.csv");

            var matrixFile = System.IO.File.Create(matrixPath); //pravljenje csv fajla u kom ce se cuvati matrica
            matrixFile.Close(); //zatvaranje fajla

            using (var textWriter = new StreamWriter(matrixPath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture))
            {


                foreach (var x in problem["data"])
                {

                    foreach (var y in x.ToArray())
                        writer.WriteField(float.Parse(y.ToString()));
                    //Console.WriteLine(y.GetType());

                    writer.NextRecord();

                }
            }

            return Ok(result.ReadAsStringAsync().Result);

            /*
            if (csv_table != String.Empty) {

                Console.WriteLine(csv_table);
                
                var data = new StringContent("{ 'Ime':'Pera ','Prezime':'Peric','Br indeksa':1111}", System.Text.Encoding.UTF8, "application/json");
                //var data = "{ 'Ime':'Pera ','Prezime':'Peric','Br indeksa':1111}";


                var response = await client.PostAsync("http://127.0.0.1:8000/docs#/default/getInformation", data);
                var response1 = await client.PostAsync("http://127.0.0.1:8000/getInformation", data);

                var asnwer = await response.Content.ReadAsStringAsync();

                Console.WriteLine(response);

                return Ok(csv_table);
            }
            else {
                return BadRequest("Request empty");
            }
            */
        }


        [HttpPost("chartData")]
        public async Task<IActionResult> ChartData(Temp json)
        {
            Console.WriteLine("chart - usao");
            Console.WriteLine(json.temp);


            //json = new Temp();

            var endpoint = new Uri(HostUrl.FastApi + "chartData");

            var jsonConvert = JsonConvert.SerializeObject(json);
            var payload = new StringContent(jsonConvert, Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content;

            //Console.WriteLine(result.ReadAsStringAsync());
            Console.WriteLine(result.ReadAsStringAsync().Result);

            //Console.WriteLine(jsonConvert);
            //Console.WriteLine(payload);



            return Ok(result.ReadAsStringAsync().Result);
        }


        [HttpPost("saveToDatabase")]
        public async Task<IActionResult> SaveToDatabase(JSONDatabase json)
        {

            return Ok();
        }



        [HttpPost("testPost")]
        public async Task<IActionResult> TestPost(JSONReceive json)
        {

            foreach (string x in json.headers)
                Console.WriteLine(x);


            Console.WriteLine("ok");
            return Ok("ok");
        }



        /*[HttpGet]
        public async void GetString() {

            Console.WriteLine(test.Data);

            //enkodirati informacije opciono

            var content = new StringContent(test.Data);

            var response = await client.PostAsync("http://127.0.0.1:8000/docs#/default/readData_getData_get", content);

            var responseString = await response.Content.ReadAsStringAsync();
        }*/

        [HttpGet("getInfo")]
        public async Task<ActionResult<string>> GetString2()
        {

            Console.WriteLine(test.Data);

            return Ok(test);
        }

        [HttpPost("downloadH5_2")]
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        public async Task<IActionResult> downloadH5_2(IFormFile file, string username, string problemName, string modelName)
        {

            //Console.WriteLine("USAOOOOOOOOOOO");
            Console.WriteLine(username);
            Console.WriteLine(problemName);
            Console.WriteLine(modelName);
            /*var ms = new MemoryStream();
            file.CopyTo(ms);
            var text = Encoding.ASCII.GetString(ms.ToArray());
            Console.WriteLine(text);*/
            Console.WriteLine(file.FileName + " " + file.Length + " " + file.ContentType);

            if (file.Length > 0)
            {

                string h5FilePath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", username, @"Models", problemName, modelName, @"model.h5");

                using (Stream fileStream = new FileStream(h5FilePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                //String[] x = filename1.Split(".");
                //string dirPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", username1, @"Models", problemName);

                ///*if (!Directory.Exists(dirPath)) {

                //    Directory.CreateDirectory(dirPath);
                //}*/

                //DirectoryInfo di = new DirectoryInfo(dirPath);      //vec gore pravim folder, slati na pajton koji je to folder i onda ga uzeti nazad i u njega upisati h5
                //DirectoryInfo[] directories = di.GetDirectories();
                //int noOfDirs = directories.Count();

                //string subDirPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", username1, @"Models", x[0], foldername1);
                //if (!Directory.Exists(subDirPath)) {

                //    Directory.CreateDirectory(subDirPath);
                //}

                //string filePath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", username1, @"Models", x[0], foldername1, file.FileName);
                //using (Stream fileStream = new FileStream(filePath, FileMode.Create)) {
                //    await file.CopyToAsync(fileStream);
                //}
            }

            return Ok("Successfully received .H5 file");
        }

        [HttpPost("get_username")]
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        public async Task<IActionResult> get_username(String username, String filename, String foldername)
        {

            Console.WriteLine("Username: {0}, filename: {1}, folername: {2}", username, filename, foldername);
            username1 = username;
            filename1 = filename;
            foldername1 = foldername;

            return Ok("Successfully received username, filename and foldername:" + username1 + " " + filename + " " + foldername);
        }

        [HttpPost("get_all_files")]
        public async Task<IActionResult> get_files(UsernameJson user)
        {
            //citanje imena fajlova
            //DirectoryInfo di = new DirectoryInfo(Directory.GetCurrentDirectory() + @"\FileDatabase\" + user.username);

            //citanje imena problema, a ne fajlova, ispravka
            string wd = Directory.GetCurrentDirectory();
            string p = System.IO.Path.Combine(wd, @"FileDatabase", user.username, @"Models");
            DirectoryInfo di = new DirectoryInfo(p);         //(Directory.GetCurrentDirectory() + @"\FileDatabase\" + username + @"\Data");
            DirectoryInfo[] dirs = di.GetDirectories();

            List<string> problemNames = new List<string>();
            List<string> csvNames = new List<string>();
            List<DateTime> dates = new List<DateTime>();

            Console.WriteLine("Saved problems: ");
            foreach (DirectoryInfo problem in dirs)
            {
                Console.WriteLine(problem.Name);
                problemNames.Add(problem.Name);
                //fileNames.Add(file.FullName);
            }
            Console.WriteLine("------------------");

            string path =  System.IO.Path.Combine(Directory.GetCurrentDirectory() + @"\FileDatabase\");
            string startingPath = System.IO.Path.Combine(path, user.username, @"Models");

            foreach (string problem in problemNames)
            {

                path = startingPath;

                path = System.IO.Path.Combine(path, problem, @"about.csv");

                using (TextFieldParser parser = new TextFieldParser(path))
                {

                    parser.TextFieldType = FieldType.Delimited;
                    parser.SetDelimiters(",");

                    string[] headers = parser.ReadFields();

                    csvNames.Add(headers[1]);
                    dates.Add(Convert.ToDateTime(headers[4]));
                }
            }

            List<ProblemsTableRow> problemTableRows = new List<ProblemsTableRow>();

            for (int i = 0; i < problemNames.Count; i++)
            {
                problemTableRows.Add(new ProblemsTableRow(problemNames[i], csvNames[i], dates[i]));
            }

            //sortiranje po opadajucem datumu:
            problemTableRows.Sort((row1, row2) => DateTime.Compare(row2.datumVreme, row1.datumVreme));

            //foreach(ProblemsTableRow problemTableRow in problemTableRows)
            //Console.WriteLine(problemTableRow.problemName + " " + problemTableRow.csvName + " " + problemTableRow.datumVreme);

            return Ok(problemTableRows);
        }

        [HttpPost("corrMatrix")]
        public async Task<IActionResult> corrMatrix(JSONMatrix json)
        {

            var endpoint = new Uri(HostUrl.FastApi + "uploadfile");

            var jsonConvert = JsonConvert.SerializeObject(json);

            var payload = new StringContent(jsonConvert, Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content;



            Console.WriteLine("----------------------------------------------------------------");
            Console.WriteLine(result.ReadAsStringAsync().Result);


            

            Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            Console.WriteLine("OVO JE NA KRAJU");

            Console.WriteLine(result.ReadAsStringAsync().Result);






            //var matrica = problem["matrica_za_predikciju"];


                return Ok(result.ReadAsStringAsync().Result);
        }


        [HttpPost("getAllModels")]
        public async Task<IActionResult> getAllModels(UsernameJson user)
        {

            string userPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username, @"Models");
            DirectoryInfo directoryInfo = new DirectoryInfo(userPath);
            DirectoryInfo[] directories = directoryInfo.GetDirectories();

            List<AllUserModels> allUserModels = new List<AllUserModels>(); //prazna lista korisnikovih modela

            foreach (DirectoryInfo directory in directories)
            {

                //directory.fullName je path za jedan problem. U tom problemu treba uraditi opet isto, uzeti sve direktorijume, i opet u foreach petlji pokupiti imena direktorijuma
                //koja predstavljaju ime modela koji je korisnik napravio

                DirectoryInfo problemInfo = new DirectoryInfo(directory.FullName);
                DirectoryInfo[] modelDirectories = problemInfo.GetDirectories();

                foreach (DirectoryInfo modelDirectory in modelDirectories)
                {

                    AllUserModels model = new AllUserModels();
                    model.modelName = modelDirectory.Name;
                    model.problemName = directory.Name;
                    model.createdAt = modelDirectory.CreationTime;

                    allUserModels.Add(model);
                }
            }

            //sortiranje po opadajucem datumu:
            allUserModels.Sort((model1, model2) => DateTime.Compare(model2.createdAt, model1.createdAt));

            //foreach (AllUserModels model in allUserModels) {
            //    Console.WriteLine("problem name: " + model.problemName + " model name: " + model.modelName + " creation date " + model.createdAt);
            //}

            return Ok(allUserModels);
        }


        [HttpPost("deleteProblem")]
        public async Task<IActionResult> deleteProblem(UsernameJson user)
        {

            string problemPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username, @"Models", user.problemName);

            Directory.Delete(problemPath, true);

            return Ok();
        }


        [HttpPost("deleteModel")]
        public async Task<IActionResult> deleteModel(UsernameJson user)
        {

            string problemPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username, @"Models", user.problemName, user.modelName);

            Directory.Delete(problemPath, true);

            return Ok();
        }


        [HttpPost("getAllMatrix")]
        public async Task<IActionResult> getAllMatrix(UsernameJson user)
        {

            List<List<float>> matrix = new List<List<float>>();

            string matrixPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username,
                @"Models", user.problemName, user.modelName, "matrix.csv");

            using (TextFieldParser parser = new TextFieldParser(matrixPath))
            {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData)
                {

                    string[] fieldRow = parser.ReadFields();
                    List<float> rowFloat = new List<float>();

                    foreach (string fieldRowCell in fieldRow)
                    {
                        rowFloat.Add(float.Parse(fieldRowCell, CultureInfo.InvariantCulture));
                    }

                    matrix.Add(rowFloat);
                }
            }

            ////citanje matrice predikcije:
            //string predMatrixPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username,
            //    @"Models", user.problemName, user.modelName, "predictMatrix.txt");
            ////citanje iz fajla
            //using (var reader = new StreamReader(predMatrixPath)) {

            //    var predictionMatrix = reader.ReadToEnd();
            //    Console.WriteLine("Read prediction matrix successfully.");
            //    Console.WriteLine(predictionMatrix.GetType());
            //}




            //objekat koji ce da se salje na front kao prikaz istreniranog modela.
            HypToSend hyperparameters = new HypToSend();

            hyperparameters.matrix = matrix;

            //citanje hiperparametara iz csv-a
            string hypPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username,
                @"Models", user.problemName, user.modelName, "hyperparameters.csv");

            using (TextFieldParser parser = new TextFieldParser(hypPath))
            {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                string[] fieldRow = parser.ReadFields(); //prvi red: 
                //activation_type,regularization_type,problem_type,optimizer_type,loss_type,encode_type,outlier_type

                fieldRow = parser.ReadFields(); // drugi red, vrednosti za prvi
                hyperparameters.activation_type = fieldRow[0];
                hyperparameters.regularization_type = fieldRow[1];
                hyperparameters.problem_type = fieldRow[2];
                hyperparameters.optimizer_type = fieldRow[3];
                hyperparameters.loss_type = fieldRow[4];
                hyperparameters.encode_type = fieldRow[5];
                hyperparameters.outlier_type = fieldRow[6];

                fieldRow = parser.ReadFields(); // treci red
                fieldRow = parser.ReadFields(); // cetvrti red
                fieldRow = parser.ReadFields(); // peti red,
                // output,hiddenLayerCounter,epoch
                fieldRow = parser.ReadFields(); //sesti red
                hyperparameters.hiddenLayerCounter = int.Parse(fieldRow[1]);
                hyperparameters.epoch = int.Parse(fieldRow[2]);

                fieldRow = parser.ReadFields(); // sedmi red,
                fieldRow = parser.ReadFields(); // osmi red,
                for (int i = 0; i < hyperparameters.hiddenLayerCounter; i++)
                    hyperparameters.neuronArray.Add(int.Parse(fieldRow[i]));

                fieldRow = parser.ReadFields(); // deveti red,
                //learning_rate,regularization_rate
                fieldRow = parser.ReadFields(); // deseti red,
                hyperparameters.learning_rate = float.Parse(fieldRow[0], CultureInfo.InvariantCulture);
                hyperparameters.regularization_rate = float.Parse(fieldRow[1], CultureInfo.InvariantCulture);

                fieldRow = parser.ReadFields(); // jedanesti red,
                //filename,connectionId,username
                fieldRow = parser.ReadFields(); // dvanesti red,
                hyperparameters.filename = fieldRow[0];
                hyperparameters.connectionId = fieldRow[1];
                hyperparameters.username = fieldRow[2];

                fieldRow = parser.ReadFields(); // trinesti red,
                foreach (string x in fieldRow)
                    hyperparameters.inputs.Add(x);

                fieldRow = parser.ReadFields(); // cetrnesti red,
                hyperparameters.output = fieldRow[0];

                fieldRow = parser.ReadFields(); // petnesti red,
                hyperparameters.train_validation_ratio = int.Parse(fieldRow[0]);
            }


            //citanje numerickih vrednosti za matricu predikcije
            string numPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username,
                @"Models", user.problemName, user.modelName, "numericalValues.csv");

            using (TextFieldParser parser = new TextFieldParser(numPath))
            {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData)
                {

                    string[] fieldRow = parser.ReadFields();

                    int label = int.Parse(fieldRow[0].ToString());
                    string header = fieldRow[1].ToString();

                    if (header.Equals(hyperparameters.output))
                    {  //ne ubacuje se output 

                        hyperparameters.numericalMatrixOutput = new NumericMatrixValue(label, header);
                        continue;
                    }

                    hyperparameters.numericalMatrixValueList.Add(new NumericMatrixValue(label, header));
                }
            }

            //citanje kategorijskih vrednosti za matricu predikcije
            string catPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username,
                @"Models", user.problemName, user.modelName, "categoricalValues.csv");

            using (TextFieldParser parser = new TextFieldParser(catPath))
            {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                while (!parser.EndOfData)
                {

                    CategoricalMatrixValue c = new CategoricalMatrixValue();

                    string row = parser.ReadLine();

                    string[] fieldRow = Regex.Split(row, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                    //foreach(string field in fieldRow)
                    //    Console.WriteLine(field);

                    c.label = int.Parse(fieldRow[0].ToString());
                    c.headerName = fieldRow[1].ToString();
                    c.randomNumber = int.Parse(fieldRow[2].ToString());
                    c.numberOfValues = int.Parse(fieldRow[3].ToString());

                    //4. index je prvi string u nizu
                    for (int i = 4; i < fieldRow.Count(); i++)
                        c.values.Add(fieldRow[i].ToString());

                    if (c.headerName.Equals(hyperparameters.output))
                    {  //ne ubacuje se output 

                        hyperparameters.categoricalMatrixOutput = c;
                        continue;
                    }

                    hyperparameters.categoricalMatrixValueList.Add(c);
                }
            }



            //citanje statistike PROBLEMA!
            string statsPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", user.username,
                @"Models", user.problemName, "statistics.csv");

            using (TextFieldParser parser = new TextFieldParser(statsPath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData) {

                    string[] row = parser.ReadFields();

                    List<string> fields = new List<string>();

                    foreach (string field in row) 
                        fields.Add(field);

                    hyperparameters.statistics.Add(fields);
                }
            }



            return Ok(hyperparameters);
        }

        [HttpPost("doPrediction")]
        public async Task<IActionResult> DoPrediction(PredictionModel predictionModel)
        {

            Console.WriteLine("PREDIKCIJAAAAA");

            //POSALJI OVE PODATKE UCITAJ OPET MATRICE ONE ZA NUMERICKE I KATEGORIJSKE I OUTPUT KLASU I POSALJI NA PYTHON
            //POSALJI I H5 NA PYTHON

            //objekat koji ce da se salje na pajton.
            PredictionDTO predictionDTOtoSend = new PredictionDTO();


            //prepisivanje podataka koji stizu u rikvestu:
            predictionDTOtoSend.array = predictionModel.array;
            predictionDTOtoSend.inputs = predictionModel.inputs;
            predictionDTOtoSend.problem_type = predictionModel.problem_type;

            //citanje output header-a iz modela, da bi mogao da ga izdvojim iz inputa:
            string hypPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", predictionModel.username,
                @"Models", predictionModel.problem_name, predictionModel.model_name, "hyperparameters.csv");

            string outputFeature = String.Empty;

            using (TextFieldParser parser = new TextFieldParser(hypPath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData) {

                    string[] fieldRow = null;

                    for(int i = 0; i <= 13; i++ ) //dolazenje do 14. reda (index 13) u kom se nalazi outputfeature
                        fieldRow = parser.ReadFields();

                    outputFeature = fieldRow[0].ToString();
                    break;
                }
            }

            if (outputFeature == String.Empty) {
                return BadRequest("Error while fetching output feature from hyperparameters.csv.");
            }
            //uzima se ime outputa dobro (Y)//



            //citanje numerickih vrednosti za matricu predikcije:
            string numPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", predictionModel.username,
                @"Models", predictionModel.problem_name, predictionModel.model_name, "numericalValues.csv");

            using (TextFieldParser parser = new TextFieldParser(numPath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData) {

                    string[] fieldRow = parser.ReadFields();

                    int label = int.Parse(fieldRow[0].ToString());
                    string header = fieldRow[1].ToString();

                    if (header.Equals(outputFeature)) {  //ne ubacuje se output 

                        predictionDTOtoSend.numericalMatrixOutput = new NumericMatrixValue(label, header);
                        continue;
                    }

                    predictionDTOtoSend.numericalMatrixValueList.Add(new NumericMatrixValue(label, header));
                }
            }


            //citanje kategorijskih vrednosti za matricu predikcije
            string catPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", predictionModel.username,
                @"Models", predictionModel.problem_name, predictionModel.model_name, "categoricalValues.csv");

            using (TextFieldParser parser = new TextFieldParser(catPath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                while (!parser.EndOfData) {

                    CategoricalMatrixValue c = new CategoricalMatrixValue();

                    string row = parser.ReadLine();

                    string[] fieldRow = Regex.Split(row, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                    //foreach(string field in fieldRow)
                    //    Console.WriteLine(field);

                    c.label = int.Parse(fieldRow[0].ToString());
                    c.headerName = fieldRow[1].ToString();
                    c.randomNumber = int.Parse(fieldRow[2].ToString());
                    c.numberOfValues = int.Parse(fieldRow[3].ToString());

                    //4. index je prvi string u nizu
                    for (int i = 4; i < fieldRow.Count(); i++)
                        c.values.Add(fieldRow[i].ToString());

                    if (c.headerName.Equals(outputFeature)) {  //ne ubacuje se output 

                        predictionDTOtoSend.categoricalMatrixOutput = c;
                        continue;
                    }

                    predictionDTOtoSend.categoricalMatrixValueList.Add(c);
                }
            }




            string modelPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", predictionModel.username, @"Models", predictionModel.problem_name, predictionModel.model_name, "model.h5");

            Console.WriteLine(modelPath);


            predictionDTOtoSend.modelPath = modelPath;

            Console.WriteLine("&&&");
            Console.WriteLine(predictionModel.statistics);



            predictionDTOtoSend.statistics = new List<List<string>>();

            foreach(var x in predictionModel.statistics)
            {
                predictionDTOtoSend.statistics.Add(x);
            }


            //predictionDTOtoSend slati na fastAPI

            var endpoint = new Uri(_configuration.GetConnectionString("FastAPIConnection") + "predict");

            var jsonConvert = JsonConvert.SerializeObject(predictionDTOtoSend);
            var payload = new StringContent(jsonConvert, Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content;

            Console.WriteLine(result.ReadAsStringAsync().Result);

            return Ok(result.ReadAsStringAsync().Result);
        }
    }
}
