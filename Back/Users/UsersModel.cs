using static System.Net.Mime.MediaTypeNames;
using System.Data;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace InventoryEyeBack.Users
{
    public class UsersModel
    {
        int id;
        int role;
        DateTime lastSeen;
        string fullName;
        string emailAddress;
        string password;
        DateTime birthDate;
        double lat;
        double lng;
        string address;
        string image;
        DateTime createdAt;
        int score = 0;
        double searchRadius;

        public UsersModel() { }
        public UsersModel(int id, int role, DateTime lastSeen, string fullName, string emailAddress, string password, DateTime birthDate, double lat, double lng, string address, string image, DateTime createdAt)
        {
            Id = id;
            Role = role;
            LastSeen = lastSeen;
            FullName = fullName;
            EmailAddress = emailAddress;
            Password = password;
            BirthDate = birthDate;
            Lat = lat;
            Lng = lng;
            Address = address;
            Image = image;
            CreatedAt = createdAt;
        }

        public int Id { get => id; set => id = value; }
        public int Role { get => role; set => role = value; }
        public DateTime LastSeen { get => lastSeen; set => lastSeen = value; }
        public string FullName { get => fullName; set => fullName = value; }
        public string EmailAddress { get => emailAddress; set => emailAddress = value; }
        public string Password { get => password; set => password = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public double Lat { get => lat; set => lat = value; }
        public double Lng { get => lng; set => lng = value; }
        public string Address { get => address; set => address = value; }
        public string Image { get => image; set => image = value; }
        public DateTime CreatedAt { get => createdAt; set => createdAt = value; }
        public int Score { get => score; set => score = value; }
        public double SearchRadius { get => searchRadius; set => searchRadius = value; }

        public int InsertUser(UsersModel user)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.InsertUserDBS(user);
        }
        public int UpdateUser(UserUpdateModel user)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.UpdateUserDBS(user);
        }

        public int UpdateUserEmail(int id, string emailAddress)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.UpdateUserEmailDBS(id, emailAddress);
        }

        public int UpdateUserPassword()
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.UpdateUserPasswordDBS(id, password);
        }

        public bool DeleteUser(string email)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.DeleteUserDBS(email);
        }

        public UserLoginModel LoginUser(UsersModel user)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.LoginUserDBS(user);
        }

        public List<UsersModel> Read()
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.ReadAllUsersDBS();
        }

        public UsersModel ReadUserById(int id)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.ReadUserByIdDBS(id);
        }

    }

}
