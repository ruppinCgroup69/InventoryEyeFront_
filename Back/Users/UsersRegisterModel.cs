namespace InventoryEyeBack.Users
{
    public class UsersRegisterModel
    {
        int role;
        DateTime lastSeen;
        string fullName;
        string emailAddress;
        string password;
        DateTime birthDate;
        float lat;
        float lng;
        string address;
        DateTime createdAt;

        public UsersRegisterModel(int role, DateTime lastSeen, string fullName, string emailAddress, string password, DateTime birthDate, float lat, float lng, string address, DateTime createdAt)
        {
            Role = role;
            LastSeen = lastSeen;
            FullName = fullName;
            EmailAddress = emailAddress;
            Password = password;
            BirthDate = birthDate;
            Lat = lat;
            Lng = lng;
            Address = address;
            CreatedAt = createdAt;
        }

        public int Role { get => role; set => role = value; }
        public DateTime LastSeen { get => lastSeen; set => lastSeen = value; }
        public string FullName { get => fullName; set => fullName = value; }
        public string EmailAddress { get => emailAddress; set => emailAddress = value; }
        public string Password { get => password; set => password = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public float Lat { get => lat; set => lat = value; }
        public float Lng { get => lng; set => lng = value; }
        public string Address { get => address; set => address = value; }
        public DateTime CreatedAt { get => createdAt; set => createdAt = value; }

        public int InsertUser(UsersRegisterModel user)
        {
            UsersDBS dbs = new UsersDBS();
            return dbs.InsertUserDBS(user);
        }
    }


}
