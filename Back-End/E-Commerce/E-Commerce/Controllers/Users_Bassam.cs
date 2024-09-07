using E_Commerce.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using E_Commerce.DTOs;


namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Users_Bassam :ControllerBase
    {

        private readonly MyDbContext _db;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly TokenGenerator _tokenGenerator;

        public Users_Bassam(MyDbContext db, PasswordHasher<User> passwordHasher, TokenGenerator tokenGenerator)
        {
            _db = db;
            _passwordHasher = passwordHasher;
            _tokenGenerator = tokenGenerator;

        }
        [HttpGet]
        public IActionResult getAllUsers()
        {
            var Users = _db.Users.ToList();
            if (Users.Any())
                return Ok(Users);
            return NoContent();
        }

        [HttpPost("register")]
        public ActionResult Register([FromForm] UserDTO model)
        {
            // Hash the password
            byte[] passwordHash, passwordSalt;
            PasswordHasher.CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

            var user = new User
            {
                Name = model.UserName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Password=model.Password,
                Email = model.Email
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(user);
        }
        [HttpPost("login")]
        public IActionResult Login([FromForm] DTOsLogin model)
        {

            // Regular email/password login
            var user = _db.Users.FirstOrDefault(x => x.Email == model.Email);
            if (user == null || !PasswordHasher.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }

            // Retrieve roles and generate JWT token
            var token = _tokenGenerator.GenerateToken(user.Name);

            return Ok(new { Token = token });
        }
        [HttpPost("Google")]
        public IActionResult RegisterationFromGoogle([FromForm] RegisterGoogleDTO model)
        {
            var user = new User
            {
                Name = model.displayName,
                Email = model.email,
                Image = model.photoURL,
            };
            _db.Users.Add(user);
            _db.SaveChanges();
            return Ok(user);
            
        }
        [HttpPost("CreatePassword")]
        public IActionResult CreatePassword([FromForm]string displayName,[FromForm]string Password)
        {
            byte[] passwordHash, passwordSalt;
            PasswordHasher.CreatePasswordHash(Password, out passwordHash, out passwordSalt);

             var User=_db.Users.Where(x=>x.Name == displayName).FirstOrDefault();
            User.PasswordHash = passwordHash;
            User.PasswordSalt = passwordSalt;
            User.Password = Password;


            _db.Users.Update(User);
            _db.SaveChanges();
            return Ok(User);
        }


    }
}
