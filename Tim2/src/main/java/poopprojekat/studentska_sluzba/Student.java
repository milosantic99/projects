package poopprojekat.studentska_sluzba;

import java.time.LocalDate;

public class Student
{
    //Obavezne za dodavanje
    private String firstName;
    private String lastName;
    private Index index;
    private LocalDate dateOfBirth;        // Godina rodjenja - 1900 (zbog tabele)
    private String city;
    private String jmbg;
    private String majorname;
    //
    public String majorId;

    // constructors
    public Student(Index brind) {
        index = brind;
    }
    public Student(String fname, String lname, Index brind)        // za vracanje iz baze za spisak studenata
    {
        firstName = fname;
        lastName = lname;
        index = brind;
    }
    public Student(String fname, String lname, Index brind, LocalDate dob, String city, String jmbg, String majorId)       // Za dodavanje studenta u bazu
    {
        this(fname, lname, brind);
        dateOfBirth = dob;
        this.city = city;
        this.jmbg = jmbg;
        this.majorId = majorId;
        setMajorName();
    }

    public Student(String fname, String lname, Index brind, LocalDate dob)
    {
        this(fname, lname, brind);
        dateOfBirth = dob;
    }

   public Student(String fname, String lname, String city, Index brind)
   {
       this(fname, lname, brind);
       this.city = city;
   }

    public Student(String fname, String lname, Index brind, String id)
    {
        this(fname, lname, brind);
        setMajorId(id);
    }

    // getters
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public Index getIndex() {
        return index;
    }
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    public String getCity() {
        return city;
    }
    public String getJmbg() {
        return jmbg;
    }
    public String getMajorId() {
        return majorId;
    }
    public String getMajorname() {
        return majorname;
    }
    // setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    public void setIndex(Index index) {
        this.index = index;
    }
    public void setJmbg(String jmbg) {
        this.jmbg = jmbg;
    }
    public void setMajorId(String majorId) {
        this.majorId = majorId;
        setMajorName();
    }

    private void setMajorName() {
        majorname = (Database.GetMajor(majorId)).name;
    }

    @Override
    public String toString()
    {
        return firstName + " " + lastName + " " + index + " " + dateOfBirth + " From:" + city + " JMBG: " + jmbg + " Smer: " + majorname;
    }
}
