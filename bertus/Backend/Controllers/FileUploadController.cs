using CsvHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Bertus_Igrannonica.Models;
using System.Text.RegularExpressions;
using System.Diagnostics;
using System.Globalization;
using System.Net;
using System.Collections.Specialized;
using Newtonsoft.Json;
using Bertus_Igrannonica.Hosts;
using Newtonsoft.Json.Linq;
using Microsoft.VisualBasic.FileIO;

namespace Bertus_Igrannonica.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase {

        //private IFormFile? file;
        //private StringBuilder? lines1;
        //private string[]? lines;
        private static JSONSend? JSONSend;                  //MORA DA OSTANE ZBOG FUNKCIZA ZA STATISTIKU//
        private Stopwatch stopwatch = new Stopwatch();
        //private static string? filePath;
        private HttpClient client = new HttpClient();
        //private static string? FileName;
        //public static string? username { get; set; }
        //Login funkcija setuje username na username korisnika, dok logout mora da ga setuje na null ili vec neku vrednost
        private readonly IConfiguration _configuration;

        public FileUploadController(IConfiguration configuration) {

            _configuration = configuration;
        }

        [HttpPost("uploadFile")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Upload([FromForm]IFormFile file, [FromForm]string username) {

            Console.WriteLine("TEST USERNAME: " + username);

            Console.WriteLine("[Thread: {0}] Upload()", Thread.CurrentThread.ManagedThreadId);

            stopwatch.Reset();
            stopwatch.Start();

            //IFormFile? file;
            

            //this.file = file;
            //FileName = file.FileName;

            Console.WriteLine("File uploaded successfully: " + file.FileName + ", size: " + file.Length);

            string wd = Directory.GetCurrentDirectory();
            string path = System.IO.Path.Combine(wd, @"FileDatabase");      //Directory.GetCurrentDirectory() + @"\FileDatabase\";
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);


            //readFile();
            //###### PREBACIVANJE readFile() funkcije u ovu ######
            //                    _ ______ _ _       ____  
            //                   | |  ____(_) |     / /\ \ 
            // _ __ ___  __ _  __| | |__   _| | ___| |  | |
            //| '__/ _ \/ _` |/ _` |  __| | | |/ _ \ |  | |
            //| | |  __/ (_| | (_| | |    | | |  __/ |  | |
            //|_|  \___|\__,_|\__,_|_|    |_|_|\___| |  | |
            //                                      \_\/_/ 
            Console.WriteLine("[Thread: {0}] readFile()", Thread.CurrentThread.ManagedThreadId);

            //ReadAsList(file);
            StringBuilder? lines1;
            lines1 = new StringBuilder();

            using (var reader = new StreamReader(file.OpenReadStream())) {

                while (reader.Peek() >= 0) {
                    lines1.AppendLine(reader.ReadLine());
                }
            }
            //kraj ReadAsList();

            string[] lines;
            lines = lines1.ToString().Split(Environment.NewLine).ToArray();

            Console.WriteLine("First 3 lines:");
            Console.WriteLine(lines[0]);
            Console.WriteLine(lines[1]);
            Console.WriteLine(lines[2]);
            Console.WriteLine("-----------------");

            JSONSend JSONSend_1 = new JSONSend();

            string[] headers = Regex.Split(lines[0], ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

            //writer.WriteRecords(headers);

            foreach (string header in headers) {

                JSONSend_1.headers.Add(header.Trim(new Char[] { ' ', '"' })); //dodavanje header-a u listu TRIMOVATI HEADERE- gotovo
                //writer.WriteField(header.Trim(new Char[] { ' ', '"' }));
                Console.WriteLine(header);
            }
            //writer.NextRecord();
            Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            for (int i = 1; i < lines.Length - 1; i++) { //dosta efikasnije od foreach-a

                //string[] data = lines[i].Split(", ");a
                string[] data = Regex.Split(lines[i], ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                //writer.WriteRecords(data);

                for (int j = 0; j < data.Length; j++) {

                    data[j] = data[j].Trim(new Char[] { ' ', '"' });
                    //writer.WriteField(data[j]);
                }
                /*if(i != lines.Length - 2) 
                    writer.NextRecord();*/

                if (i < 6) {
                    foreach (string x in data)
                        Console.WriteLine(x);
                    Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                }

                JSONSend_1.data.Add(data); //dodavanje podataka u listu
            }

            //foreach (string header in JSONSend.headers)
            //Console.WriteLine("HEADER: " + header);
            Console.WriteLine();
            Console.WriteLine("Reading .csv file successful.");

            JSONSend_1.filename = file.FileName;

            //cuvanje fajla ako je korisnik prijavljen
            if (username != null) {
                //Task writeToFile = WriteToFile();
                WriteToFile(username, file.FileName, JSONSend_1).ContinueWith(t => Console.WriteLine(t.Exception), TaskContinuationOptions.OnlyOnFaulted);

                /*try {
                    await WriteToFile().ConfigureAwait(false);
                }
                catch (Exception ex) {
                    Trace.WriteLine(ex);
                }*/
            }

            //kraj readFile() funkcije

            var endpoint = new Uri(HostUrl.FastApi + "uploadfile");

            var jsonConvert = JsonConvert.SerializeObject(JSONSend_1);
            //Console.WriteLine(jsonConvert);
            //var jsonConvert = JsonConvert.SerializeObject("test");
            var payload = new StringContent(jsonConvert, Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content;
            Console.WriteLine(result);


            stopwatch.Stop();
            Console.WriteLine("Elapsed Time is: " + stopwatch.Elapsed);
            Console.WriteLine("--------------");


            return Ok(JSONSend_1);
        }

        /*private void readFile() {

            Console.WriteLine("[Thread: {0}] readFile()", Thread.CurrentThread.ManagedThreadId);

            ReadAsList(file);

            lines = lines1.ToString().Split(Environment.NewLine).ToArray();

            Console.WriteLine("First 3 lines:");
            Console.WriteLine(lines[0]);
            Console.WriteLine(lines[1]);
            Console.WriteLine(lines[2]);
            Console.WriteLine("-----------------");

            JSONSend = new JSONSend();

            string[] headers = Regex.Split(lines[0], ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

            //writer.WriteRecords(headers);

            foreach (string header in headers) {

                JSONSend.headers.Add(header.Trim(new Char[] { ' ', '"' })); //dodavanje header-a u listu TRIMOVATI HEADERE- gotovo
                //writer.WriteField(header.Trim(new Char[] { ' ', '"' }));
                Console.WriteLine(header);
            }
            //writer.NextRecord();
            Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            for (int i = 1; i < lines.Length - 1; i++) { //dosta efikasnije od foreach-a

                //string[] data = lines[i].Split(", ");a
                string[] data = Regex.Split(lines[i], ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                //writer.WriteRecords(data);

                for (int j = 0; j < data.Length; j++) {

                    data[j] = data[j].Trim(new Char[] { ' ', '"' });
                    //writer.WriteField(data[j]);
                }
                /*if(i != lines.Length - 2) 
                    writer.NextRecord();*/

                /*if (i < 6) {
                    foreach (string x in data)
                        Console.WriteLine(x);
                    Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                }

                JSONSend.data.Add(data); //dodavanje podataka u listu
            }

            //foreach (string header in JSONSend.headers)
            //Console.WriteLine("HEADER: " + header);
            Console.WriteLine();
            Console.WriteLine("Reading .csv file successful.");

            JSONSend.filename = file.FileName;

            //cuvanje fajla ako je korisnik prijavljen
            if (username != null) {
                //Task writeToFile = WriteToFile();
                WriteToFile().ContinueWith(t => Console.WriteLine(t.Exception), TaskContinuationOptions.OnlyOnFaulted);

                /*try {
                    await WriteToFile().ConfigureAwait(false);
                }
                catch (Exception ex) {
                    Trace.WriteLine(ex);
                }
            }
        }*/

        

        public static async Task WriteToFile(string username, string FileName, JSONSend JSONSend_1) {

            await Task.Run(() => {

                Console.WriteLine("[Thread: {0}] WriteToFile()", Thread.CurrentThread.ManagedThreadId);

                string path;
                string pathToCreate;
                if (username != null && FileName != null) {

                    string wd = Directory.GetCurrentDirectory();
                    path = System.IO.Path.Combine(wd, @"FileDatabase", username, @"Data");        //Directory.GetCurrentDirectory() + @"\FileDatabase\" + username + @"\Data";
                    pathToCreate = System.IO.Path.Combine(path, FileName);

                }
                else {
                    Console.WriteLine("Username or FileName == null");
                    return;
                }

                //filePath = pathToCreate;

                if (System.IO.Directory.Exists(path))
                    if (!System.IO.File.Exists(pathToCreate)) {
                        //Console.WriteLine("test: {0}", pathToSave);
                        var newFile = System.IO.File.Create(pathToCreate);
                        newFile.Close();
                    }
                    else {
                        Console.WriteLine("File already exists. Aborting writing to it.");
                        return;
                    }

                /* using (System.IO.StreamWriter file = new System.IO.StreamWriter(fileName)) {
                     for (int i = 0; i < 10; i++) {
                         await Task.Delay(timeout);
                         await file.WriteLineAsync("Don't wait");
                         Console.WriteLine("[Thread: {0}] {1}: {2}", Thread.CurrentThread.ManagedThreadId, fileName, i);
                     }
                 }*/

                using (var textWriter = new StreamWriter(pathToCreate))
                using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture)) {

                    //dodavanje header-a
                    foreach (string header in JSONSend_1.headers) {

                        writer.WriteField(header.Trim(new Char[] { ' ', '"' }));
                    }
                    writer.NextRecord();

                    //dodavanje podataka
                    for (int i = 0; i < JSONSend_1.data.Count; i++) { //dosta efikasnije od foreach-a

                        string[] data = JSONSend_1.data.ElementAt(i);

                        //writer.WriteRecords(data);

                        for (int j = 0; j < data.Length; j++) {

                            writer.WriteField(data[j]);
                        }
                        //if (i != JSONSend.data.Count - 1) //poslednji red nema end of string 
                        writer.NextRecord();

                        if (i < 6) {
                            foreach (string x in data)
                                Console.WriteLine(x);
                            Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        }
                    }
                }
            });
        }

        //private void ReadAsList(IFormFile file) {

        //    lines1 = new StringBuilder();

        //    using (var reader = new StreamReader(file.OpenReadStream())) {

        //        while (reader.Peek() >= 0) {
        //            lines1.AppendLine(reader.ReadLine());
        //        }
        //    }
        //}


        [HttpPost("editValue")]
        public async Task<IActionResult> EditValue(ValueCell cell) {

            Console.WriteLine("x osa: {0}, y osa: {1}. Value: {2}", cell.i, cell.j, cell.value);
            /*Console.WriteLine(cell.i);
            Console.WriteLine(cell.j);
            Console.WriteLine(cell.value);*/

            try {
                string[] l = JSONSend.data.ElementAt(cell.i);
                Console.WriteLine("Old value: " + l[cell.j]);

                l[cell.j] = cell.value;

                l = JSONSend.data.ElementAt(cell.i);
                Console.WriteLine("New value: " + l[cell.j]);
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
            }

            return Ok(cell);
        }



        [HttpPost("showTable")]
        public async Task<IActionResult> SendPage(PageToShow Info)
        {

            Console.WriteLine("Page index: " + Info.PageIndex + "; Items per page: " + Info.LinesPerPage);

            JSONSend page = new JSONSend();
            page.headers = JSONSend.headers;
            page.filename = JSONSend.filename;

            int startingIndex = Info.PageIndex * Info.LinesPerPage;

            for (int i = startingIndex; i < startingIndex + Info.LinesPerPage; i++)
            {

                string[] data = JSONSend.data.ElementAt(i);
                page.data.Add(data);
            }

            return Ok(page);
        }

        [HttpPost("Minimum")]
        public async Task<IActionResult> Minimum()
        {
            
            var min = 0.0;
            bool flag = false;
            Metrics met = new Metrics();

            met.headers = JSONSend.headers;

            for (int i = 0; i < JSONSend.headers.Count; i++)
            {
                float tmp;
                var tmpflag = float.TryParse(JSONSend.data.ElementAt(0)[i], out tmp);
                if(tmpflag)
                    min = tmp;
                for (int j = 0; j < JSONSend.data.Count; j++)
                {
                    float number;
                    flag = false; // If flag is false min is number else min is string
                    if (float.TryParse(JSONSend.data.ElementAt(j)[i], out number))
                    {
                        if (min > number)
                        {
                            min = number;
                        }
                    }
                    else
                    {
                        flag = true;
                    }
                }
                if (flag == false)
                    met.data.Add(String.Format("{0:0.00}", min));
                else
                    met.data.Add("String");
            }

            return Ok(met);
        }

        [HttpPost("Maximum")]
        public async Task<IActionResult> Maximum()
        {

            var max = 0.0;
            bool flag = false;
            Metrics met = new Metrics();

            met.headers = JSONSend.headers;

            for (int i = 0; i < JSONSend.headers.Count; i++)
            {
                max = 0;
                for (int j = 0; j < JSONSend.data.Count; j++)
                {
                    float number;
                    flag = false; // If flag is false min is number else min is string
                    if (float.TryParse(JSONSend.data.ElementAt(j)[i], out number))
                    {
                        if (max < number)
                        {
                            max = number;
                        }
                    }
                    else
                    {
                        flag = true;
                    }
                }
                if (flag == false)
                    met.data.Add(String.Format("{0:0.00}", max));
                else
                    met.data.Add("String");
            }

            return Ok(met);
        }

        [HttpPost("Average")]
        public async Task<IActionResult> Average()
        {

            var sum = 0.0;
            bool flag = false;
            Metrics met = new Metrics();

            met.headers = JSONSend.headers;

            for (int i = 0; i < JSONSend.headers.Count; i++)
            {
                sum = 0;
                for (int j = 0; j < JSONSend.data.Count; j++)
                {
                    float number;
                    flag = false; // If flag is false min is number else min is string
                    if (float.TryParse(JSONSend.data.ElementAt(j)[i], out number))
                    {
                        sum += number;
                        flag = false;
                    }
                    else
                    {
                        flag = true;
                    }
                }
                if (flag == false)
                    met.data.Add(String.Format("{0:0.00}", sum/JSONSend.data.Count));
                else
                    met.data.Add("String");
            }

            return Ok(met);
        }

        private static double GetMedian(List<double> xs)
        {
            xs.Sort();
            return xs[xs.Count / 2];
        }

        [HttpPost("Median")]
        public async Task<IActionResult> Median()
        {
            bool flag = false;
            Metrics met = new Metrics();

            met.headers = JSONSend.headers;

            for (int i = 0; i < JSONSend.headers.Count; i++)
            {
                List<double> median = new List<double>();
                for (int j = 0; j < JSONSend.data.Count; j++)
                {
                    float number;
                    flag = false; // If flag is false min is number else min is string
                    if (float.TryParse(JSONSend.data.ElementAt(j)[i], out number))
                    {
                        median.Add(number);
                        flag = false;
                    }
                    else
                    {
                        flag = true;
                    }
                }
                if (flag == false)
                    met.data.Add(String.Format("{0:0.00}", GetMedian(median)));
                else
                    met.data.Add("String");
            }

            return Ok(met);
        }

        [HttpPost("NaN")]
        public async Task<IActionResult> NaN()
        {
            Metrics met = new Metrics();
            int counter = 0;

            met.headers = JSONSend.headers;

            for (int i = 0; i < JSONSend.headers.Count; i++)
            {
                counter = 0;
                for (int j = 0; j < JSONSend.data.Count; j++)
                {
                    if (JSONSend.data.ElementAt(j)[i].Equals(""))
                    {
                        counter++;
                    }
                }
                met.data.Add(counter.ToString());
            }

            return Ok(met);

        }

        /*private void readProblemCsv(string username, string problem)
        {

            Console.WriteLine("[Thread: {0}] readFile()", Thread.CurrentThread.ManagedThreadId);



            lines1 = new StringBuilder();

            string wd = Directory.GetCurrentDirectory();
            string path = System.IO.Path.Combine(wd, @"FileDatabase", username, @"problem");
            using (var reader = new StreamReader(path))     //(Directory.GetCurrentDirectory() + @"\FileDatabase\" + username + @"\" + "problem"))
            {

                while (reader.Peek() >= 0) {
                    lines1.AppendLine(reader.ReadLine());
                }
            }

            lines = lines1.ToString().Split(Environment.NewLine).ToArray();

            Console.WriteLine("First 3 lines:");
            Console.WriteLine(lines[0]);
            Console.WriteLine(lines[1]);
            Console.WriteLine(lines[2]);
            Console.WriteLine("-----------------");

            JSONSend = new JSONSend();

            string[] headers = Regex.Split(lines[0], ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

            foreach (string header in headers){
                JSONSend.headers.Add(header.Trim(new Char[] { ' ', '"' }));
                Console.WriteLine(header);
            }

            Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            for (int i = 1; i < lines.Length - 1; i++)
            { //dosta efikasnije od foreach-a
                string[] data = Regex.Split(lines[i], ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                for (int j = 0; j < data.Length; j++)
                    data[j] = data[j].Trim(new Char[] { ' ', '"' });

                if (i < 6){
                    foreach (string x in data)
                        Console.WriteLine(x);
                    Console.WriteLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                }

                JSONSend.data.Add(data); //dodavanje podataka u listu
            }

            Console.WriteLine("Reading .csv file successful.");

            JSONSend.filename = "";

            //cuvanje fajla ako je korisnik prijavljen
            if (username != null)
                WriteToFile().ContinueWith(t => Console.WriteLine(t.Exception), TaskContinuationOptions.OnlyOnFaulted);
        }*/

        [HttpPost("readProblem")]
        public async Task<IActionResult> ReadProblem(UsernameJson json)
        {

            //Console.WriteLine("Username " + json.username);
            //Console.WriteLine("Problem " + json.problemName);


            //readProblemCsv(json.username, json.problemName);

            //uzimanje imena csv fajla
            CsvFromFileSystem csvFromFileSystem = new CsvFromFileSystem();
            string wd = Directory.GetCurrentDirectory();
            string path = System.IO.Path.Combine(wd, @"FileDatabase");      //Directory.GetCurrentDirectory() + @"\FileDatabase\";
            path = System.IO.Path.Combine(path, json.username, @"Models", json.problemName);


            string aboutPath = System.IO.Path.Combine(path, @"about.csv");

            using (TextFieldParser parser = new TextFieldParser(aboutPath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                string[] headers = parser.ReadFields();
    
                try {
                    csvFromFileSystem.filename = headers[1];
                }
                catch (Exception ex){
                    Console.WriteLine("An error occurred while reading from csv from fileSystem. " + ex.ToString());
                }
                    
            }

            //uzimanje iz csv fajla
            //string CSVpath = System.IO.Path.Combine(wd, @"FileDatabase", json.username, @"Data", csvFromFileSystem.filename);
            string CSVpath = System.IO.Path.Combine(wd, @"FileDatabase", json.username, @"Models", json.problemName, csvFromFileSystem.filename);
            using (TextFieldParser parser = new TextFieldParser(CSVpath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                //while (!parser.EndOfData) {
                //    //Process row
                //    string[] fields = parser.ReadFields();
                //    foreach (string field in fields) {
                //        //TODO: Process field
                //    }
                //}
                // uzimanje headera
                csvFromFileSystem.headers = parser.ReadFields();

                //uzimanje data iz csv fajla
                while (!parser.EndOfData) {
                    //Process row
                    string[] fields = parser.ReadFields();
                    csvFromFileSystem.data.Add(fields);
                }
            }

            string dataTypesPath = System.IO.Path.Combine(path, @"dataTypes.csv");

            using (TextFieldParser parser = new TextFieldParser(dataTypesPath)) {

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                string[] dataTypes = parser.ReadFields();

                foreach(string type in dataTypes)
                    csvFromFileSystem.data_types.Add(type);
            }
            Console.WriteLine("Vracam problem");
            return Ok(csvFromFileSystem);
        }


        [HttpPost("saveProblem")]
        public async Task<IActionResult> PostString(ProblemModel json)
        {
            //Console.WriteLine("problem - " + json.problem_name);
            //Console.WriteLine("problem - " + json.data_cleaning);
            //foreach (var x in json.replace_missing)
            //    Console.WriteLine(x);
            //foreach (var x in json.replace_missing)
            //    Console.WriteLine(x);


            foreach(var x in json.data_types)
                Console.WriteLine(x);


            var endpoint = new Uri(HostUrl.FastApi + "saveProblem");

            var jsonConvert = JsonConvert.SerializeObject(json);
            var payload = new StringContent(jsonConvert, Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content;

            //Console.WriteLine(result.ReadAsStringAsync().Result);\

            JObject problem = JObject.Parse(result.ReadAsStringAsync().Result);

            //Console.WriteLine(problem["filename"]);
            //Console.WriteLine(problem["headers"]);
            //Console.WriteLine(problem["data_cleaning"]);
            //Console.WriteLine(problem["data"]);

            //SAVE PROBLEM
            string wd = Directory.GetCurrentDirectory();
            string p = System.IO.Path.Combine(wd, @"FileDatabase");
            string path = System.IO.Path.Combine(p, json.username, @"Models", json.problem_name);

            if (!Directory.Exists(path)) {
                Directory.CreateDirectory(path);
            }
            else
                Console.WriteLine("Directory already exists for that problem.");

            //upis opisa problema
            string filePath = System.IO.Path.Combine(path, @"about.csv");
            using (var textWriter = new StreamWriter(filePath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture)) {

                writer.WriteField(json.username);
                writer.WriteField(json.filename);
                writer.WriteField(json.outlier_type);
                writer.WriteField(json.data_cleaning);

                DateTime vreme = DateTime.Now;
                writer.WriteField(vreme.ToString());
            }

            //cuvanje statistike u csv formatu:
            string statsPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", json.username, @"Models", json.problem_name, "statistics.csv");

            using (var textWriter = new StreamWriter(statsPath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture)) {

                foreach (List<string> array in json.statistics) {

                    foreach (string field in array) {
                        writer.WriteField(field);
                    }

                    writer.NextRecord();
                }
            }

            //cuvanje data tipova za svaku kolonu:
            string dataTypesPath = Path.Combine(Directory.GetCurrentDirectory(), @"FileDatabase", json.username, @"Models", json.problem_name, "dataTypes.csv");

            using (var textWriter = new StreamWriter(dataTypesPath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture)) {

                foreach (var x in json.data_types)
                    writer.WriteField(x);
            }

            //upis replace_missing opcija
            filePath = System.IO.Path.Combine(path, @"replaceMissing.csv");
            using (var textWriter = new StreamWriter(filePath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture)) {

                foreach(var x in json.replace_missing)
                    writer.WriteField(x);
            }

            //cuvanje obradjenog fajla koji se vratio sa pajtona
            var headers = problem["headers"].ToArray();
            var data = problem["data"].ToArray();

            filePath = System.IO.Path.Combine(path, json.filename);
            using (var textWriter = new StreamWriter(filePath))
            using (var writer = new CsvWriter(textWriter, CultureInfo.InvariantCulture)) {

                //dodavanje header-a
                foreach (string header in headers) {

                    writer.WriteField(header.Trim(new Char[] { ' ', '"' }));
                }
                writer.NextRecord();

                //dodavanje podataka
                for (int i = 0; i < data.Count(); i++) { //dosta efikasnije od foreach-a

                    var array = data[i].ToArray();

                    //writer.WriteRecords(data);

                    for (int j = 0; j < array.Count(); j++) {

                        writer.WriteField((string)array[j]);
                    }
                    //if (i != JSONSend.data.Count - 1) //poslednji red nema end of string 
                    writer.NextRecord();
                }
            }
            return Ok(result.ReadAsStringAsync().Result);
        }

        [HttpPost("readP")]
        public async Task<IActionResult> getProblemCSV(UsernameJson problem) {

            string wd = Directory.GetCurrentDirectory();
            string path = System.IO.Path.Combine(wd, @"FileDatabase", problem.username, @"Data", problem.csvName);
            FileStream file = System.IO.File.OpenRead(path);

            StringBuilder privateLines = new StringBuilder();

            using (var reader = new StreamReader(file)) {

                while (reader.Peek() >= 0) {

                    privateLines.AppendLine(reader.ReadLine());
                    //Console.WriteLine(lines);
                }
            }





            return null;
        }
    }
}
