using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.CommentDTOs
{
    public class CommentUpdateRequest
    {
        [MaxLength(2000)]
        public string? Content { get; set; }
    }
}