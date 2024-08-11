namespace InventoryEyeBack.Users
{
    public class UserUpdateModel
    {
        int id;
        int role;
        DateTime lastSeen;
        string fullName;
        string emailAddress;
        DateTime birthDate;
        double lat;
        double lng;
        string address;
        string image;
        DateTime createdAt;
        int score = 0;
        double searchRadius = 0;

        public UserUpdateModel() { }

        public UserUpdateModel(int id, int role, DateTime lastSeen, string fullName, string emailAddress, DateTime birthDate, double lat, double lng, string address, string image, DateTime createdAt, double searchRadius)
        {
            Id = id;
            Role = role;
            LastSeen = lastSeen;
            FullName = fullName;
            EmailAddress = emailAddress;
            BirthDate = birthDate;
            Lat = lat;
            Lng = lng;
            Address = address;
            Image = image;
            CreatedAt = createdAt;
            SearchRadius = searchRadius;
        }

        public int Id { get; set; }
        public int Role { get; set; }
        public DateTime LastSeen { get; set; }
        public string FullName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime BirthDate { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Score { get; set; }
        public double SearchRadius { get; set; }

    }
}
