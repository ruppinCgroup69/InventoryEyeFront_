using static System.Net.Mime.MediaTypeNames;
using System.Data;
using System.Net.Mail;
using System.Net;

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
        float lat;
        float lng;
        string address;
        string image;
        DateTime createdAt;

        public UsersModel(int id, int role, DateTime lastSeen, string fullName, string emailAddress, string password, DateTime birthDate, float lat, float lng, string address, string image, DateTime createdAt)
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
        public float Lat { get => lat; set => lat = value; }
        public float Lng { get => lng; set => lng = value; }
        public string Address { get => address; set => address = value; }
        public string Image { get => image; set => image = value; }
        public DateTime CreatedAt { get => createdAt; set => createdAt = value; }

        public int UpdateUser()
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.UpdateUserDBS(role,lastSeen,fullName,emailAddress,password,birthDate,lat,lng,address,image,createdAt);
        }
    }

}
